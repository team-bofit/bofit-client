import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useTransition,
} from 'react';

import { CarouselArrow } from './carousel-arrow';
import { CarouselContext, type CarouselContextType } from './carousel-context';
import { CarouselDots } from './carousel-dots';
import { CarouselItem, type CarouselItemProps } from './carousel-item';
import { reducer } from './hooks/use-action-reducer';
import { useCarouselDrag } from './hooks/use-carousel-drag';
import { useCarouselVirtual } from './hooks/use-carousel-virtual';

import * as styles from './carousel.css';

// Main Carousel Component
export interface CarouselProps {
  children: React.ReactNode;
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
 * @param children
 * @param autoPlay
 * @param slidesPerSecond
 * @param slidesPerView
 * @param infinite
 * @param pauseOnHover
 * @param className
 * @param onSlideChange
 * @constructor
 */
const CarouselRoot = ({
  children,
  autoPlay = false,
  slidesPerSecond = 0.5,
  slidesPerView = 1,
  infinite = true,
  pauseOnHover = true,
  className = '',
  onSlideChange,
}: CarouselProps) => {
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    offset: 0,
    isHovered: false,
  });
  const [, startTransition] = useTransition();

  const offsetRef = useRef(0); // 최신 오프셋 값을 참조하기 위한 ref
  const rafRef = useRef<number | null>(null); // requestAnimationFrame ID
  const lastTimeRef = useRef<number | null>(null); // 마지막 프레임 타임스탬프

  // Carousel.Item 중 slideItem 과 컨트롤 요소 분리
  const { slideItems, controlItems } = useMemo(() => {
    const allChildren = Children.toArray(children);
    const slides: ReactElement[] = [];
    const controls: ReactElement[] = [];

    allChildren.forEach((child) => {
      if (React.isValidElement(child)) {
        // Carousel.Item인지 확인
        if (child.type === CarouselItem) {
          slides.push(child);
        } else {
          // Arrow, Dots 등 컨트롤 요소들
          controls.push(child);
        }
      }
    });
    return { slideItems: slides, controlItems: controls };
  }, [children]);

  const totalItems = slideItems.length;
  const slideWidth = 100 / slidesPerView; // 각 슬라이드의 폭(%)

  // const cycleWidth = totalItems * slideWidth; // 한 사이클(모든 슬라이드)의 총 폭(%)
  const setCurrentIndex = (index: number) =>
    dispatch({ type: 'SET_INDEX', index });

  const setOffset = (offset: number) =>
    dispatch({ type: 'SET_OFFSET', offset });

  const setIsHovered = (value: boolean) => dispatch({ type: 'HOVER', value });

  // 다음 슬라이드로 이동하는 함수
  const goToNext = () => {
    const newOffset = infinite
      ? state.offset + slideWidth
      : Math.min(
          (state.currentIndex + 1) * slideWidth,
          (totalItems - slidesPerView) * slideWidth,
        );
    dispatch({ type: 'NEXT', totalItems, slidesPerView, slideWidth, infinite });
    offsetRef.current = newOffset;
  };

  const goToPrev = () => {
    const newOffset = infinite
      ? state.offset - slideWidth
      : Math.max((state.currentIndex - 1) * slideWidth, 0);
    dispatch({ type: 'PREV', totalItems, slidesPerView, slideWidth, infinite });
    offsetRef.current = newOffset;
  };

  const goToSlide = useCallback(
    (index: number) => {
      dispatch({ type: 'GOTO', index, slideWidth });
      offsetRef.current = index * slideWidth;
    },
    [slideWidth],
  );

  // 드래그 로직을 커스텀 훅으로 분리
  const {
    isDragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useCarouselDrag({
    onNext: goToNext,
    onPrev: goToPrev,
    slidesPerView,
    totalItems,
    offsetRef,
    setOffset,
    setCurrentIndex,
    setIsHovered,
  });

  const { virtualItems } = useCarouselVirtual({
    items: slideItems,
    slideWidthPct: slideWidth,
    offsetPct: state.offset + dragOffset,
    overscan: 2,
    slidesPerView,
  });

  // 마우스 호버 이벤트 핸들러
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover, setIsHovered]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover, setIsHovered]);

  // 연속적인 자동 재생 애니메이션
  useEffect(() => {
    if (
      !autoPlay ||
      totalItems <= 1 ||
      (pauseOnHover && state.isHovered) ||
      !infinite
    ) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // 초 단위
      lastTimeRef.current = timestamp;

      // 연속적으로 오른쪽으로 이동 (무한정 증가)
      const moveSpeed = slidesPerSecond * slideWidth; // 초당 이동할 퍼센트
      const deltaOffset = moveSpeed * deltaTime;

      const newOffset = offsetRef.current + deltaOffset;

      // 오프셋은 무한정 증가, 모듈로 연산은 transform에서만!
      offsetRef.current = newOffset;

      // currentIndex는 실제 데이터 기준으로만 계산
      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;

      startTransition(() => {
        dispatch({ type: 'AUTOPLAY_SET', offset: newOffset, index: newIndex });
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
    state.currentIndex,
    pauseOnHover,
    state.isHovered,
    infinite,
    slideWidth,
  ]);

  useEffect(() => {
    onSlideChange?.(state.currentIndex);
  }, [state.currentIndex, onSlideChange]);

  const contextValue: CarouselContextType = {
    currentIndex: state.currentIndex,
    totalItems,
    goToNext,
    goToPrev,
    goToSlide,
    canGoNext: infinite || state.currentIndex < totalItems - slidesPerView,
    canGoPrev: infinite || state.currentIndex > 0,
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={`${styles.container} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className={styles.slideContainer}
          style={{
            transform: `translateX(-${state.offset + dragOffset}%)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {virtualItems.map((v) => (
            <div key={v.key} className={styles.slide} style={v.style}>
              {(v.data as React.ReactElement<CarouselItemProps>).props.children}
            </div>
          ))}
        </div>
      </div>
      {controlItems}
    </CarouselContext.Provider>
  );
};

// Export as compound component
export const Carousel = Object.assign(CarouselRoot, {
  Item: CarouselItem,
  Arrow: CarouselArrow,
  Dots: CarouselDots,
});
