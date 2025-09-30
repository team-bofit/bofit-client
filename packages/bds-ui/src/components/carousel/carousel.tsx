import React, {
  Children,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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
 * Carousel 컴포넌트
 *
 * 여러 개의 아이템을 가로로 스크롤하여 볼 수 있는 UI 컴포넌트
 *
 * @param slidesPerView - 'auto': 각 슬라이드의 실제 너비 기준, number: 한 화면에 보일 슬라이드 개수
 * @param infinite - 무한 루프 여부 (autoPlay가 true면 자동으로 true)
 * @param autoPlay - 자동 재생 여부
 * @param modules - ['Navigation', 'Pagination'] 표시할 UI 모듈
 *
 * @example
 * // 일반 모드
 * <Carousel slidesPerView={3}>
 *   <Carousel.Item>Item 1</Carousel.Item>
 * </Carousel>
 *
 * // Auto 모드 - 각 슬라이드의 실제 width 기준
 * <Carousel slidesPerView="auto">
 *   <Carousel.Item className={styles.slide}>Item 1</Carousel.Item>
 * </Carousel>
 */

const Carousel = ({
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
  // ==================== State ====================
  const effectiveInfinite = autoPlay || infinite;
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentIndex: 0,
    offset: 0,
  });

  // ==================== Refs ====================
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const controllerRef = useRef<CarouselController | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // ==================== Data ====================
  const childrenArray = Children.toArray(children);
  const totalItems = childrenArray.length;
  const isAutoMode = slidesPerView === 'auto';
  const slideWidth = isAutoMode ? 0 : 100 / slidesPerView;

  // ==================== Measurement ====================
  const [maxSlideHeight, setMaxSlideHeight] = useState(0);
  const [autoSlideWidth, setAutoSlideWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    if (!measureRef.current) {
      return;
    }

    // 슬라이드 높이 측정
    const heights = Array.from(
      measureRef.current.querySelectorAll(`.${styles.measureItem}`),
    ).map((el) => el.getBoundingClientRect().height);
    setMaxSlideHeight(Math.max(...heights, 0));

    // auto 모드: 슬라이드 너비 측정
    if (isAutoMode && trackRef.current) {
      const firstSlide = measureRef.current.querySelector(
        `.${styles.measureItem}`,
      );
      const containerRect =
        trackRef.current.parentElement?.getBoundingClientRect();

      if (firstSlide && containerRect) {
        setAutoSlideWidth(firstSlide.getBoundingClientRect().width);
        setContainerWidth(containerRect.width);
      }
    }
  });

  // ==================== Controller ====================
  useMemo(() => {
    if (isAutoMode) {
      // auto 모드: 측정된 너비 기반
      if (autoSlideWidth > 0 && containerWidth > 0) {
        const config: CarouselControllerConfig = {
          totalItems,
          slidesPerView: 1, // 항상 1개씩 이동
          slideWidth: (autoSlideWidth / containerWidth) * 100,
          infinite: effectiveInfinite,
        };
        controllerRef.current = controllerRef.current
          ? (controllerRef.current.updateConfig(config), controllerRef.current)
          : new CarouselController(config);
      }
    } else {
      // 일반 모드
      const config: CarouselControllerConfig = {
        totalItems,
        slidesPerView: slidesPerView as number,
        slideWidth,
        infinite: effectiveInfinite,
      };
      controllerRef.current = controllerRef.current
        ? (controllerRef.current.updateConfig(config), controllerRef.current)
        : new CarouselController(config);
    }
  }, [
    totalItems,
    slidesPerView,
    slideWidth,
    effectiveInfinite,
    autoSlideWidth,
    containerWidth,
    isAutoMode,
  ]);

  // ==================== State Update ====================
  const updateCarouselState = useCallback((newState: CarouselState) => {
    setCarouselState(newState);
    offsetRef.current = newState.offset;
  }, []);

  // ==================== Navigation ====================
  const goToNext = useCallback(() => {
    if (!controllerRef.current) {
      return;
    }
    updateCarouselState(controllerRef.current.moveNext(carouselState));
  }, [carouselState, updateCarouselState]);

  const goToPrev = useCallback(() => {
    if (!controllerRef.current) {
      return;
    }
    updateCarouselState(controllerRef.current.movePrev(carouselState));
  }, [carouselState, updateCarouselState]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!controllerRef.current) {
        return;
      }
      updateCarouselState(
        controllerRef.current.moveToIndex(carouselState, index),
      );
    },
    [carouselState, updateCarouselState],
  );

  // ==================== Touch/Drag ====================
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
    infinite: effectiveInfinite,
    onStateUpdate: updateCarouselState,
  });

  // ==================== Virtual Rendering ====================
  const { displaySlides } = useCarouselVirtual({
    items: childrenArray,
    slideWidthPercent: slideWidth,
    offsetPercent: carouselState.offset + dragOffset,
    overscan: 5,
    slidesPerView,
    infinite: effectiveInfinite,
  });

  // ==================== Auto Play ====================
  const [, startTransition] = useTransition();

  useEffect(() => {
    const shouldPause =
      !autoPlay ||
      isAutoMode ||
      totalItems <= 1 ||
      (pauseOnHover && isHovered) ||
      isDragging;

    if (shouldPause) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      let newOffset =
        offsetRef.current + slidesPerSecond * slideWidth * deltaTime;

      // 유한 모드에서 끝 처리
      if (!effectiveInfinite) {
        const maxOffset = Math.max(
          (totalItems - (slidesPerView as number)) * slideWidth,
          0,
        );
        if (newOffset >= maxOffset) {
          newOffset = 0;
        }
      }

      offsetRef.current = newOffset;

      // 인덱스 계산
      const newIndex = effectiveInfinite
        ? Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems
        : Math.min(
            totalItems - 1,
            Math.floor((newOffset + slideWidth / 2) / slideWidth),
          );

      startTransition(() => {
        setCarouselState({ currentIndex: newIndex, offset: newOffset });
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
    slideWidth,
    pauseOnHover,
    isHovered,
    isDragging,
    effectiveInfinite,
    isAutoMode,
  ]);

  // ==================== Callbacks ====================
  useEffect(() => {
    onSlideChange?.(carouselState.currentIndex);
  }, [carouselState.currentIndex, onSlideChange]);

  // ==================== Context ====================
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

  // ==================== Render Helpers ====================
  const getTransform = () => {
    if (isAutoMode && containerWidth > 0) {
      const px = ((carouselState.offset + dragOffset) / 100) * containerWidth;
      return `translateX(-${px}px)`;
    }
    return `translateX(-${carouselState.offset + dragOffset}%)`;
  };

  const renderSlide = (child: React.ReactNode, idx: number, key: string) => {
    const itemProps = (child as React.ReactElement<CarouselItemProps>).props;
    return (
      <div
        key={key}
        className={`${styles.measureItem} ${itemProps.className || ''}`}
      >
        {itemProps.children}
      </div>
    );
  };

  // ==================== Early Return ====================
  if (totalItems === 0) {
    return null;
  }

  // ==================== Render ====================
  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={`${styles.container} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Hidden: 높이/너비 측정용 */}
        <div ref={measureRef} className={styles.measure}>
          {childrenArray.map((child, idx) =>
            renderSlide(child, idx, `measure-${idx}`),
          )}
        </div>

        {/* 슬라이드 트랙 */}
        <div
          ref={trackRef}
          className={styles.slideContainer}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDragStart={(e) => e.preventDefault()}
          style={{
            transform: getTransform(),
            transition: isDragging
              ? 'none'
              : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            cursor: isDragging ? 'grabbing' : 'grab',
            height: maxSlideHeight ? `${maxSlideHeight}px` : 'auto',
            width: isAutoMode ? 'max-content' : '100%',
          }}
        >
          {displaySlides.map((slide) => {
            const itemProps = (
              slide.data as React.ReactElement<CarouselItemProps>
            ).props;
            return (
              <div
                key={slide.key}
                className={`${styles.slide} ${itemProps.className || ''}`}
                style={slide.style}
              >
                {itemProps.children}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        {modules.includes('Navigation') && (
          <>
            <CarouselArrow direction="left" />
            <CarouselArrow direction="right" />
          </>
        )}
      </div>

      {/* Pagination */}
      {modules.includes('Pagination') && <CarouselDots />}
    </CarouselContext.Provider>
  );
};

Carousel.Item = CarouselItem;
Carousel.Arrow = CarouselArrow;
Carousel.Dots = CarouselDots;

export default Carousel;
