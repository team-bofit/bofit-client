import React, {
  Children,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { CarouselArrow } from './carousel-arrow';
import { CarouselContext, type CarouselContextType } from './carousel-context';
import { CarouselDots } from './carousel-dots';
import { CarouselItem, type CarouselItemProps } from './carousel-item';

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
const CarouselRoot: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  slidesPerSecond = 0.5,
  slidesPerView = 1,
  infinite = true,
  pauseOnHover = true,
  className = '',
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 활성 슬라이드 인덱스
  const [offset, setOffset] = useState(0); // 전체 슬라이드 트랙의 단위 이동량
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [startX, setStartX] = useState(0); // 드래그 시작 X 좌표
  const [currentX, setCurrentX] = useState(0); // 드래그 현재 X 좌표
  const [dragOffset, setDragOffset] = useState(0); // 드래그로 인한 오프셋 변화량
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
  const slideWidth = 100 / slidesPerView;

  // 다음/이전 슬라이드로 이동하는 함수
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = infinite
        ? prev + 1
        : Math.min(prev + 1, totalItems - slidesPerView);
      const nextOffset = next * slideWidth;
      setOffset(nextOffset);
      offsetRef.current = nextOffset;
      return next;
    });
  }, [totalItems, slidesPerView, infinite, currentIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = infinite ? prev - 1 : Math.max(prev - 1, 0);
      const nextOffset = next * slideWidth;
      setOffset(nextOffset);
      offsetRef.current = nextOffset;
      return next;
    });
  }, [totalItems, slidesPerView, infinite, currentIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      const targetOffset = index * slideWidth;
      setOffset(targetOffset);
      offsetRef.current = targetOffset;
    },
    [slidesPerView],
  );

  // infinite 스크롤 리셋 처리
  useEffect(() => {
    if (!infinite) {
      return;
    }

    const slideWidth = 100 / slidesPerView;
    const maxOffset = totalItems * slideWidth;

    // 복제된 슬라이드 영역에 들어가면 원래 위치로 순간 이동
    if (offset >= maxOffset) {
      const resetOffset = offset - maxOffset;
      setOffset(resetOffset);
      offsetRef.current = resetOffset;
      setCurrentIndex(Math.floor(resetOffset / slideWidth));
    } else if (offset < 0) {
      const resetOffset = offset + maxOffset;
      setOffset(resetOffset);
      offsetRef.current = resetOffset;
      setCurrentIndex(Math.floor(resetOffset / slideWidth));
    }
  }, [offset, infinite, totalItems, slidesPerView]);

  // 마우스 호버 이벤트 핸들러
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

  // 터치/드래그 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0]?.clientX || 0);
    setCurrentX(e.touches[0]?.clientX || 0);
    setDragOffset(0);
    setIsHovered(true); // 드래그 중에는 자동재생 일시정지
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) {
        return;
      }
      setCurrentX(e.touches[0]?.clientX || 0);

      // 드래그 중 실시간 오프셋 업데이트
      const diff = startX - (e.touches[0]?.clientX || 0);
      const containerWidth = e.currentTarget.clientWidth;
      const dragOffsetPercent = (diff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) {
      return;
    }

    const diff = startX - currentX;
    const threshold = 50; // 드래그 임계값
    const slideWidth = 100 / slidesPerView;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    } else {
      // 임계값에 도달하지 않으면 현재 드래그된 위치에서 가장 가까운 슬라이드로 이동
      const currentOffset = offsetRef.current + dragOffset;
      const nearestSlideIndex = Math.round(currentOffset / slideWidth);
      const targetOffset = nearestSlideIndex * slideWidth;

      setOffset(targetOffset);
      offsetRef.current = targetOffset;
      setCurrentIndex(nearestSlideIndex % totalItems);
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsHovered(false); // 드래그 종료 시 자동재생 재개
  }, [
    isDragging,
    startX,
    currentX,
    goToNext,
    goToPrev,
    slidesPerView,
    totalItems,
  ]);

  // 마우스 드래그 이벤트 핸들러
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setDragOffset(0);
    setIsHovered(true); // 드래그 중에는 자동재생 일시정지
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) {
        return;
      }
      setCurrentX(e.clientX);

      // 드래그 중 실시간 오프셋 업데이트
      const diff = startX - e.clientX;
      const containerWidth = e.currentTarget.clientWidth;
      const dragOffsetPercent = (diff / containerWidth) * 100;
      setDragOffset(dragOffsetPercent);
    },
    [isDragging, startX],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) {
      return;
    }

    const diff = startX - currentX;
    const threshold = 50; // 드래그 임계값
    const slideWidth = 100 / slidesPerView;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    } else {
      // 임계값에 도달하지 않으면 현재 드래그된 위치에서 가장 가까운 슬라이드로 이동
      const currentOffset = offsetRef.current + dragOffset;
      const nearestSlideIndex = Math.round(currentOffset / slideWidth);
      const targetOffset = nearestSlideIndex * slideWidth;

      setOffset(targetOffset);
      offsetRef.current = targetOffset;
      setCurrentIndex(nearestSlideIndex % totalItems);
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsHovered(false); // 드래그 종료 시 자동재생 재개
  }, [
    isDragging,
    startX,
    currentX,
    goToNext,
    goToPrev,
    slidesPerView,
    totalItems,
  ]);

  // 연속적인 자동 재생 애니메이션
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

      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // 초 단위
      lastTimeRef.current = timestamp;

      // 연속적으로 오른쪽으로 이동
      const slideWidth = 100 / slidesPerView; // 한 슬라이드의 너비
      const moveSpeed = slidesPerSecond * slideWidth; // 초당 이동할 퍼센트
      const deltaOffset = moveSpeed * deltaTime;

      let newOffset = offsetRef.current + deltaOffset;

      // 무한 루프: 마지막 슬라이드를 넘어가면 처음으로
      const maxOffset = totalItems * slideWidth;
      if (newOffset >= maxOffset) {
        newOffset = newOffset - maxOffset;
      }

      setOffset(newOffset);
      offsetRef.current = newOffset;

      // 현재 인덱스 업데이트 (가장 가까운 슬라이드)
      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }

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
    currentIndex,
    pauseOnHover,
    isHovered,
    infinite,
  ]);

  // Call onSlideChange when index changes
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const contextValue: CarouselContextType = {
    currentIndex,
    totalItems,
    goToNext,
    goToPrev,
    goToSlide,
    canGoNext: infinite || currentIndex < totalItems - slidesPerView,
    canGoPrev: infinite || currentIndex > 0,
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
            transform: `translateX(-${offset + dragOffset}%)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* 무한 루프를 위해 슬라이드를 복제 */}
          {slideItems.map((child, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{
                flex: `0 0 ${100 / slidesPerView}%`,
                maxWidth: `${100 / slidesPerView}%`,
              }}
            >
              {(child as React.ReactElement<CarouselItemProps>).props.children}
            </div>
          ))}
          {/* 연속적인 루프를 위해 slidesPerView만큼 슬라이드를 복제 */}
          {autoPlay &&
            infinite &&
            slideItems.length > 0 &&
            Array.from({ length: slidesPerView }).map((_, cloneIndex) => (
              <div
                key={`clone-${cloneIndex}`}
                className={styles.slide}
                style={{
                  flex: `0 0 ${100 / slidesPerView}%`,
                  maxWidth: `${100 / slidesPerView}%`,
                }}
              >
                {
                  (
                    slideItems[
                      cloneIndex % slideItems.length
                    ] as React.ReactElement<CarouselItemProps>
                  ).props.children
                }
              </div>
            ))}
        </div>
        {/* 컨트롤 요소들 (Arrow, Dots) 렌더링 */}
        {controlItems}
      </div>
    </CarouselContext.Provider>
  );
};

// Export as compound component
export const Carousel = Object.assign(CarouselRoot, {
  Item: CarouselItem,
  Arrow: CarouselArrow,
  Dots: CarouselDots,
});
