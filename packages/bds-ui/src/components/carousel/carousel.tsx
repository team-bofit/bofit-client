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
  // autoPlay가 true이면 infinite를 강제로 true로 설정
  const effectiveInfinite = autoPlay ? true : infinite;
  const [carouselState, setCarouselState] = useState<CarouselState>({
    currentIndex: 0, // 현재 슬라이드 인덱스
    offset: 0, // 왼쪽으로 이동한 거리. 총 비율(%)
  });
  const [, startTransition] = useTransition();

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const controllerRef = useRef<CarouselController | null>(null);

  const totalItems = Children.toArray(children).length;
  const slideWidth = 100 / slidesPerView; // 한 개의 슬라이드의 폭(%)

  /** 컨트롤러 초기화 및 업데이트 */
  useMemo(() => {
    const config: CarouselControllerConfig = {
      totalItems,
      slidesPerView,
      slideWidth,
      infinite: effectiveInfinite,
    };

    if (!controllerRef.current) {
      controllerRef.current = new CarouselController(config);
    } else {
      controllerRef.current.updateConfig(config);
    }
  }, [totalItems, slidesPerView, slideWidth, effectiveInfinite]);

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
    const newState = control.moveNext(carouselState); // 컨트롤러가 다음 상태를 반환
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

  /** 캐러셀 터치(드래그) 시 필요한 훅
   *  dragOffset: 드래그 중 임시 오프셋
   *  드래그 중에는 실제 상태의 offset은 고정하고, 화면 적용은 offset + dragOffset로 즉시 반영
   *  -> 드래그가 끝나면 컨트롤러를 통해 스냅 (가까운 슬라이드 정렬) 상태로 업데이트.
   * */
  const {
    isHovered,
    isDragging,
    dragOffset, // 드래그 중 임시 오프셋
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

  /** 가상화 렌더 훅
   *  current offset + dragOffset 기준으로 화면에 보여질 인접 슬라이드만 계산
   *  각 항목에는 style 과 key가 포함되어 있음 => 컨테이너 안에서 연속 트랙처럼 보이게 구성
   * */
  const { cycleWidth, displaySlides, spacerWidthPercent } = useCarouselVirtual({
    items: Children.toArray(children),
    slideWidthPercent: slideWidth,
    offsetPercent: carouselState.offset + dragOffset,
    overscan: 5,
    slidesPerView,
  });

  // no measurement – rely on natural flow height from children

  /** 자동 재생 이펙트 */
  useEffect(() => {
    // autoPlay가 켜져 있고, 아이템이 2개 이상이며, (pauseOnHover && isHovered)가 아닐 때
    if (!autoPlay || totalItems <= 1 || (pauseOnHover && isHovered)) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // 초 단위 경과 시간
      lastTimeRef.current = timestamp;
      const moveSpeed = slidesPerSecond * slideWidth; // 초당 이동 거리(%)
      const deltaOffset = moveSpeed * deltaTime; // 이번 프레임에서 이동할 거리(%)
      let newOffset = offsetRef.current + deltaOffset; // 새로운 오프셋 계산

      // effectiveInfinite가 true가 아닌 경우 (autoPlay = true이므로 실제로는 항상 true)
      // 하지만 마지막 페이지에서 처음으로 돌아가는 로직을 위해 처리
      if (!effectiveInfinite) {
        const maxOffset = Math.max(
          (totalItems - slidesPerView) * slideWidth,
          0,
        );
        if (newOffset >= maxOffset) {
          // 마지막에 도달하면 처음으로 돌아가기
          newOffset = 0;
        }
      }

      offsetRef.current = newOffset; // newOffset 만큼 이동시키고

      let newIndex: number;
      if (effectiveInfinite) {
        newIndex =
          Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems; // 중앙 기준으로 가장 가까운 인덱스 계산
      } else {
        newIndex = Math.min(
          Math.floor((newOffset + slideWidth / 2) / slideWidth),
          totalItems - 1,
        );
      }

      startTransition(() => {
        // 상태 업데이트는 트랜지션으로 처리
        const newState: CarouselState = {
          currentIndex: newIndex,
          offset: newOffset,
        };
        setCarouselState(newState);
      });

      // 다음 프레임 요청
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      // cleanup 에서 raf/타임스탬프 초기화
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
    effectiveInfinite,
    slideWidth,
  ]);

  /** 외부에서 현재 인덱스 변경 이벤트 핸들러 */
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
    <div style={{ position: 'relative' }}>
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
              display: 'flex',
              width: '100%',
              transform: 'none',
              transition: isDragging
                ? 'none'
                : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <div
              style={{ flex: '0 0 auto', width: `${spacerWidthPercent}%` }}
            />
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
    </div>
  );
};

Carousel.Item = CarouselItem;
Carousel.Arrow = CarouselArrow;
Carousel.Dots = CarouselDots;

export default Carousel;
