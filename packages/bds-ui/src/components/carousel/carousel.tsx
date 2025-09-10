import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { CarouselArrow } from './carousel-arrow';
import { CarouselContext, type CarouselContextType } from './carousel-context';
import {
  CarouselController,
  type CarouselControllerConfig,
  type CarouselState,
} from './carousel-controller';
import { CarouselDots } from './carousel-dots';
import { CarouselItem, type CarouselItemProps } from './carousel-item';
import { useCarouselDrag } from './hooks/use-carousel-drag';
import { useCarouselVirtual } from './hooks/use-carousel-virtual';

import * as styles from './carousel.css';

// Main Carousel Component
export interface CarouselProps {
  children: React.ReactNode;
  modules?: ('Pagination' | 'Navigation' | 'autoPlay')[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slidesPerSecond?: number;
  slidesPerView?: number;
  infinite?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  onSlideChange?: (index: number) => void;
}

/**
 * Carousel 컴포넌트는 여러 개의 아이템을 가로로 스크롤하여 볼 수 있는 UI 컴포넌트입니다.
 * 각 아이템마다 스냅이 되며, 자동 재생, 무한 루프, 터치 및 드래그 지원 등의 기능을 제공합니다.
 * @param children - 캐러셀 아이템들
 * @param modules - 표시할 모듈들 (['Pagination', 'Navigation', 'autoPlay'])
 * @param autoPlay - 자동 재생 여부
 * @param slidesPerSecond - 초당 슬라이드 이동 속도
 * @param slidesPerView - 한 번에 보여질 슬라이드 개수
 * @param infinite - 무한 루프 여부
 * @param pauseOnHover - 호버 시 일시정지 여부
 * @param className - 추가 CSS 클래스
 * @param onSlideChange - 슬라이드 변경 시 콜백
 * @constructor
 * @example
 * ```tsx
 * // Navigation과 Pagination을 모두 표시
 * <Carousel modules={['Navigation', 'Pagination']} slidesPerView={3} autoPlay slidesPerSecond={0.5}>
 *     <Carousel.Item>Item 1</Carousel.Item>
 *     <Carousel.Item>Item 2</Carousel.Item>
 *     <Carousel.Item>Item 3</Carousel.Item>
 *     <Carousel.Item>Item 4</Carousel.Item>
 *     <Carousel.Item>Item 5</Carousel.Item>
 *     <Carousel.Item>Item 6</Carousel.Item>
 * </Carousel>
 *
 * // Navigation만 표시
 * <Carousel modules={['Navigation']} slidesPerView={1}>
 *     <Carousel.Item>Item 1</Carousel.Item>
 *     <Carousel.Item>Item 2</Carousel.Item>
 * </Carousel>
 *
 * // Pagination만 표시
 * <Carousel modules={['Pagination']} slidesPerView={1}>
 *     <Carousel.Item>Item 1</Carousel.Item>
 *     <Carousel.Item>Item 2</Carousel.Item>
 * </Carousel>
 * ```
 */
const CarouselRoot = ({
  children,
  modules = [],
  autoPlay = false,
  slidesPerSecond = 0.5,
  slidesPerView = 1,
  infinite = true,
  pauseOnHover = true,
  className = '',
  onSlideChange,
}: CarouselProps) => {
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentIndex: 0,
    offset: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [, startTransition] = useTransition();

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const controllerRef = useRef<CarouselController | null>(null);

  const slideItems = useMemo(() => {
    const allChildren = Children.toArray(children);
    const slides: ReactElement[] = [];

    allChildren.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === CarouselItem) {
          slides.push(child);
        }
      }
    });
    return slides;
  }, [children]);

  const totalItems = slideItems.length;
  const slideWidth = 100 / slidesPerView; // 각 슬라이드의 폭(%)

  // 컨트롤러 초기화 및 업데이트
  useMemo(() => {
    const config: CarouselControllerConfig = {
      totalItems,
      slidesPerView,
      slideWidth,
      infinite,
    };

    if (!controllerRef.current) {
      controllerRef.current = new CarouselController(config);
    } else {
      controllerRef.current.updateConfig(config);
    }
  }, [totalItems, slidesPerView, slideWidth, infinite]);

  const updateCarouselState = useCallback((newState: CarouselState) => {
    setCarouselState(newState);
    offsetRef.current = newState.offset;
  }, []);

  const goToNext = useCallback(() => {
    const control = controllerRef.current;
    if (!control) {
      return;
    }
    const newState = control.moveNext(carouselState);
    updateCarouselState(newState);
  }, [carouselState, updateCarouselState]);

  const goToPrev = useCallback(() => {
    const control = controllerRef.current;
    if (!control) {
      return;
    }
    const newState = control.movePrev(carouselState);
    updateCarouselState(newState);
  }, [carouselState, updateCarouselState]);

  const goToSlide = useCallback(
    (index: number) => {
      const control = controllerRef.current;

      if (!control) {
        return;
      }
      const newState = control.moveToIndex(carouselState, index);
      updateCarouselState(newState);
    },
    [carouselState, updateCarouselState],
  );

  const handleSmartDragEnd = useCallback(
    (dragOffsetPercent: number) => {
      if (autoPlay && infinite) {
        // 1) 드래그로 이동한 위치를 '새 기준 오프셋'으로 채택
        let newOffset = carouselState.offset + dragOffsetPercent;

        // 2) 유한 모드에서는 트랙 범위를 넘어가지 않도록 '오프셋만' 클램프 (스냅 X)
        if (!infinite) {
          const maxOffset = Math.max(
            (totalItems - slidesPerView) * slideWidth,
            0,
          );
          newOffset = Math.min(Math.max(newOffset, 0), maxOffset);
        }

        // 3) 인덱스는 표시용으로만 재계산(양수 정규화), 오프셋은 라운딩하지 않음
        const safeTotal = Math.max(totalItems, 1);
        const rawIndex =
          Math.floor((newOffset + slideWidth / 2) / slideWidth) % safeTotal;
        const newIndex =
          totalItems > 0 ? (rawIndex + totalItems) % totalItems : 0;

        updateCarouselState({ currentIndex: newIndex, offset: newOffset });
      } else {
        const control = controllerRef.current;

        if (!control) {
          return;
        }

        // 한 장씩 스냅: 드래그 방향 기준으로 ±1칸만 이동
        const magnitude = Math.abs(dragOffsetPercent);
        const threshold = slideWidth / 4; // 슬라이드 폭의 1/ 이상이면 이동

        let newState: CarouselState;
        if (magnitude < threshold) {
          // 임계값 미만이면 제자리 스냅
          newState = control.moveToIndex(
            carouselState,
            carouselState.currentIndex,
          );
        } else {
          newState =
            dragOffsetPercent > 0
              ? control.moveNext(carouselState)
              : control.movePrev(carouselState);
        }
        updateCarouselState(newState);
      }
    },
    [
      carouselState.offset,
      infinite,
      totalItems,
      slidesPerView,
      slideWidth,
      updateCarouselState,
    ],
  );

  const {
    isDragging,
    dragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCarouselDrag({
    onNext: goToNext,
    onPrev: goToPrev,
    onDragStart: () => setIsHovered(true),
    onDragEnd: () => setIsHovered(false),
    onSmartDragEnd: handleSmartDragEnd,
  });

  const { displaySlides } = useCarouselVirtual({
    items: slideItems,
    slideWidthPct: slideWidth,
    offsetPct: carouselState.offset + dragOffset,
    overscan: 5,
    slidesPerView,
  });

  /** 호버 상태 관리 */
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover]);

  /** 자동 재생 이펙트 */
  useEffect(() => {
    if (
      !autoPlay ||
      totalItems <= 1 ||
      (pauseOnHover && isHovered) ||
      !infinite
    ) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const moveSpeed = slidesPerSecond * slideWidth;
      const deltaOffset = moveSpeed * deltaTime;
      const newOffset = offsetRef.current + deltaOffset;

      offsetRef.current = newOffset;

      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;

      startTransition(() => {
        const newState: CarouselState = {
          currentIndex: newIndex,
          offset: newOffset,
        };
        setCarouselState(newState);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [
    autoPlay,
    totalItems,
    slidesPerSecond,
    slidesPerView,
    carouselState.currentIndex,
    pauseOnHover,
    isHovered,
    infinite,
    slideWidth,
  ]);

  useEffect(() => {
    onSlideChange?.(carouselState.currentIndex);
  }, [carouselState.currentIndex, onSlideChange]);

  const contextValue: CarouselContextType = {
    currentIndex: carouselState.currentIndex,
    totalItems,
    goToNext,
    goToPrev,
    goToSlide,
    canGoNext: controllerRef.current?.canMoveNext(carouselState) ?? false,
    canGoPrev: controllerRef.current?.canMovePrev(carouselState) ?? false,
  };

  const shouldShowNavigation = modules.includes('Navigation');
  const shouldShowPagination = modules.includes('Pagination');

  if (totalItems === 0) {
    return null;
  }

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={`${styles.container} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          touchAction: 'pan-y',
        }}
      >
        <div
          className={styles.slideContainer}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            transform: `translateX(-${carouselState.offset + dragOffset}%)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {displaySlides.map((v) => (
            <div key={v.key} className={styles.slide} style={v.style}>
              {(v.data as React.ReactElement<CarouselItemProps>).props.children}
            </div>
          ))}
        </div>
        {/* modules 배열에 따라 Navigation 화살표 렌더링 */}
        {shouldShowNavigation && (
          <>
            <CarouselArrow direction="left" />
            <CarouselArrow direction="right" />
          </>
        )}
      </div>
      {/* modules 배열에 따라 Pagination 점들 렌더링 */}
      {shouldShowPagination && <CarouselDots />}
    </CarouselContext.Provider>
  );
};

// Export as compound component
export const Carousel = Object.assign(CarouselRoot, {
  Item: CarouselItem,
  Arrow: CarouselArrow,
  Dots: CarouselDots,
});
