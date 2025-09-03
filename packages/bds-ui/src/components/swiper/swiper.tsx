import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';

import { Icon } from '../../icons';
import * as styles from './swiper.css';

// Swiper Context
interface SwiperContextType {
  currentIndex: number;
  totalItems: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToSlide: (index: number) => void;
}

const SwiperContext = createContext<SwiperContextType | null>(null);

const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error('Swiper 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

// Main Swiper Component
interface SwiperProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  slidesPerSecond?: number;
  pauseOnHover?: boolean;
  className?: string;
  onSlideChange?: (index: number) => void;
}

const SwiperRoot: React.FC<SwiperProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  slidesPerSecond = 0.5,
  pauseOnHover = true,
  className = '',
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Swiper.Item만 슬라이드로 필터링
  const { slideItems, controlItems } = useMemo(() => {
    const allChildren = React.Children.toArray(children);
    const slides: React.ReactElement[] = [];
    const controls: React.ReactElement[] = [];

    allChildren.forEach((child) => {
      if (React.isValidElement(child)) {
        // Swiper.Item인지 확인
        if (child.type === SwiperItem) {
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

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    const nextOffset = ((currentIndex + 1) % totalItems) * 100;
    setOffset(nextOffset);
    offsetRef.current = nextOffset;
  }, [currentIndex, totalItems]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    const prevOffset = ((currentIndex - 1 + totalItems) % totalItems) * 100;
    setOffset(prevOffset);
    offsetRef.current = prevOffset;
  }, [currentIndex, totalItems]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    const targetOffset = index * 100;
    setOffset(targetOffset);
    offsetRef.current = targetOffset;
  }, []);

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

  // 연속적인 자동 재생 애니메이션
  useEffect(() => {
    if (!autoPlay || totalItems <= 1 || (pauseOnHover && isHovered)) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // 초 단위
      lastTimeRef.current = timestamp;

      // 연속적으로 오른쪽으로 이동
      const moveSpeed = slidesPerSecond * 100; // 초당 이동할 퍼센트
      const deltaOffset = moveSpeed * deltaTime;

      let newOffset = offsetRef.current + deltaOffset;

      // 무한 루프: 마지막 슬라이드를 넘어가면 처음으로
      const maxOffset = totalItems * 100;
      if (newOffset >= maxOffset) {
        newOffset = newOffset - maxOffset;
      }

      setOffset(newOffset);
      offsetRef.current = newOffset;

      // 현재 인덱스 업데이트 (가장 가까운 슬라이드)
      const newIndex = Math.floor((newOffset + 50) / 100) % totalItems;
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
    currentIndex,
    pauseOnHover,
    isHovered,
  ]);

  // Call onSlideChange when index changes
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const contextValue: SwiperContextType = {
    currentIndex,
    totalItems,
    goToNext,
    goToPrev,
    goToSlide,
  };

  if (totalItems === 0) return null;

  return (
    <SwiperContext.Provider value={contextValue}>
      <div
        className={`${styles.container} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.slideContainer}
          style={{
            transform: `translateX(-${offset}%)`,
            transition: autoPlay ? 'none' : 'transform 0.3s ease-in-out',
          }}
        >
          {/* 무한 루프를 위해 슬라이드를 복제 */}
          {slideItems.map((child, index) => (
            <div key={index} className={styles.slide}>
              {(child as React.ReactElement<SwiperItemProps>).props.children}
            </div>
          ))}
          {/* 연속적인 루프를 위해 처음 슬라이드를 마지막에 추가 */}
          {autoPlay && slideItems.length > 0 && (
            <div className={styles.slide}>
              {
                (slideItems[0] as React.ReactElement<SwiperItemProps>).props
                  .children
              }
            </div>
          )}
        </div>
        {/* 컨트롤 요소들 (Arrow, Dots) 렌더링 */}
        {controlItems}
      </div>
    </SwiperContext.Provider>
  );
};

// Swiper Item Component
interface SwiperItemProps {
  children: React.ReactNode;
  className?: string;
}

const SwiperItem: React.FC<SwiperItemProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

// Swiper Arrow Component
interface SwiperArrowProps {
  direction: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SwiperArrow: React.FC<SwiperArrowProps> = ({
  direction,
  children,
  className = '',
  onClick,
}) => {
  const { goToNext, goToPrev } = useSwiperContext();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      direction === 'left' ? goToPrev() : goToNext();
    }
  }, [direction, goToNext, goToPrev, onClick]);

  const arrowClass =
    direction === 'left' ? styles.arrowLeft : styles.arrowRight;
  const iconName = direction === 'left' ? 'caret_left_lg' : 'caret_right_lg';

  return (
    <button
      className={`${arrowClass} ${className}`}
      onClick={handleClick}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    >
      {children || <Icon name={iconName} color="white" />}
    </button>
  );
};

// Swiper Dots Component
interface SwiperDotsProps {
  className?: string;
}

const SwiperDots: React.FC<SwiperDotsProps> = ({ className = '' }) => {
  const { currentIndex, totalItems, goToSlide } = useSwiperContext();

  if (totalItems <= 1) return null;

  return (
    <div className={`${styles.dots} ${className}`}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Export as compound component
export const Swiper = Object.assign(SwiperRoot, {
  Item: SwiperItem,
  Arrow: SwiperArrow,
  Dots: SwiperDots,
});
