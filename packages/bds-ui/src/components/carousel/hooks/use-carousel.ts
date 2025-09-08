import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCarouselOptions {
  totalItems: number;
  slidesPerView?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  slidesPerSecond?: number;
  pauseOnHover?: boolean;
  onSlideChange?: (index: number) => void;
}

export interface CarouselAPI {
  currentIndex: number;
  offset: number;
  isHovered: boolean;
  isDragging: boolean;
  goToNext: () => void;
  goToPrev: () => void;
  goToSlide: (index: number) => void;
  pause: () => void;
  resume: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDragStart: (clientX: number) => void;
  onDragMove: (clientX: number) => void;
  onDragEnd: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  dragOffset: number;
}

export function useCarousel({
  totalItems,
  slidesPerView = 1,
  infinite = true,
  autoPlay = false,
  slidesPerSecond = 0.5,
  pauseOnHover = true,
  onSlideChange,
}: UseCarouselOptions): CarouselAPI {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragCurrent, setDragCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const slideWidth = 100 / slidesPerView;

  const goToNext = useCallback(() => {
    if (!infinite && currentIndex >= totalItems - slidesPerView) {
      return;
    }

    const newOffset = infinite
      ? offset + slideWidth
      : Math.min(
          (currentIndex + 1) * slideWidth,
          (totalItems - slidesPerView) * slideWidth,
        );

    setOffset(newOffset);
    offsetRef.current = newOffset;

    if (infinite) {
      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;
      setCurrentIndex(newIndex);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, totalItems - slidesPerView));
    }
  }, [currentIndex, totalItems, slidesPerView, infinite, offset, slideWidth]);

  const goToPrev = useCallback(() => {
    if (!infinite && currentIndex <= 0) {
      return;
    }

    const newOffset = infinite
      ? offset - slideWidth
      : Math.max((currentIndex - 1) * slideWidth, 0);

    setOffset(newOffset);
    offsetRef.current = newOffset;

    if (infinite) {
      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;
      const positiveIndex = newIndex < 0 ? newIndex + totalItems : newIndex;
      setCurrentIndex(positiveIndex);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [currentIndex, totalItems, slidesPerView, infinite, offset, slideWidth]);

  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalItems - 1));
      const newOffset = clampedIndex * slideWidth;
      setCurrentIndex(clampedIndex);
      setOffset(newOffset);
      offsetRef.current = newOffset;
    },
    [totalItems, slideWidth],
  );

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  const onMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  }, [pauseOnHover]);

  const onMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [pauseOnHover]);

  const onDragStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setDragStart(clientX);
      setDragCurrent(clientX);
      if (pauseOnHover) {
        setIsHovered(true);
      }
    },
    [pauseOnHover],
  );

  const onDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) {
        return;
      }
      setDragCurrent(clientX);
    },
    [isDragging],
  );

  const onDragEnd = useCallback(() => {
    if (!isDragging) {
      return;
    }

    const diff = dragStart - dragCurrent;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setIsDragging(false);
    if (pauseOnHover) {
      setIsHovered(false);
    }
  }, [isDragging, dragStart, dragCurrent, goToNext, goToPrev, pauseOnHover]);

  useEffect(() => {
    if (
      !autoPlay ||
      !infinite ||
      totalItems <= 1 ||
      isPaused ||
      (pauseOnHover && isHovered)
    ) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const deltaOffset = slidesPerSecond * slideWidth * deltaTime;
      const newOffset = offsetRef.current + deltaOffset;

      offsetRef.current = newOffset;
      setOffset(newOffset);

      const newIndex =
        Math.floor((newOffset + slideWidth / 2) / slideWidth) % totalItems;
      setCurrentIndex(newIndex);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        lastTimeRef.current = null;
      }
    };
  }, [
    autoPlay,
    infinite,
    totalItems,
    isPaused,
    pauseOnHover,
    isHovered,
    slidesPerSecond,
    slideWidth,
  ]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const dragOffset = isDragging
    ? ((dragStart - dragCurrent) / window.innerWidth) * 100
    : 0;

  return {
    currentIndex,
    offset,
    isHovered,
    isDragging,
    goToNext,
    goToPrev,
    goToSlide,
    pause,
    resume,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDragMove,
    onDragEnd,
    canGoNext: infinite || currentIndex < totalItems - slidesPerView,
    canGoPrev: infinite || currentIndex > 0,
    dragOffset,
  };
}
