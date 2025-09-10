import React, {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

import { CarouselArrow } from './carousel-arrow';
import { CarouselDots } from './carousel-dots';
import { CarouselItem, type CarouselItemProps } from './carousel-item';
import { CarouselController } from './hooks/carousel-controller';
import { useCarouselTouch } from './hooks/use-carousel-touch';
import { useCarouselVirtual } from './hooks/use-carousel-virtual';
import {
  CarouselContextType,
  CarouselControllerConfig,
  CarouselProps,
  CarouselState,
} from './types/types';

import * as styles from './carousel.css';

export const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

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
  const [, startTransition] = useTransition();

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const controllerRef = useRef<CarouselController | null>(null);

  const totalItems = Children.toArray(children).length;
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

  /** 캐러셀 상태 업데이트 헬퍼 */
  const updateCarouselState = useCallback((newState: CarouselState) => {
    setCarouselState(newState);
    offsetRef.current = newState.offset;
  }, []);

  /** 다음, 이전, 특정 인덱스 이동 함수 */
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

  /** 터치 및 드래그 훅 */
  const {
    isHovered,
    isDragging,
    dragOffset,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEnter,
    handleMouseLeave,
  } = useCarouselTouch({
    controller: controllerRef.current,
    carouselState,
    pauseOnHover,
    autoPlay,
    infinite,
    onStateUpdate: updateCarouselState,
  });

  /** 가상화 훅 */
  const { displaySlides } = useCarouselVirtual({
    items: Children.toArray(children),
    slideWidthPercent: slideWidth,
    offsetPercent: carouselState.offset + dragOffset,
    overscan: 5,
    slidesPerView,
  });

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

  /** 슬라이드 변경 콜백 이펙트 */
  useEffect(() => {
    onSlideChange?.(carouselState.currentIndex);
  }, [carouselState.currentIndex, onSlideChange]);

  const contextValue: CarouselContextType = {
    currentIndex: carouselState.currentIndex,
    controller: controllerRef.current,
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
          {displaySlides.map((slide) => (
            <div key={slide.key} className={styles.slide} style={slide.style}>
              {
                (slide.data as React.ReactElement<CarouselItemProps>).props
                  .children
              }
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
