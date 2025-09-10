/** ======= carousel-controller.ts ======= */

import React, { PointerEvent } from 'react';

import { CarouselController } from '../hooks/carousel-controller';

export interface CarouselControllerConfig {
  totalItems: number;
  slidesPerView: number;
  slideWidth: number;
  infinite: boolean;
}

export interface CarouselState {
  currentIndex: number;
  offset: number;
}

/** ======= use-carousel-touch.ts ======= */
export interface UseCarouselTouchProps {
  controller: CarouselController | null;
  carouselState: CarouselState;
  pauseOnHover: boolean;
  autoPlay: boolean;
  infinite: boolean;
  onStateUpdate: (newState: CarouselState) => void;
}

export interface UseCarouselTouchReturn {
  isHovered: boolean;
  isDragging: boolean;
  dragOffset: number;
  handlePointerDown: (e: PointerEvent<Element>) => void;
  handlePointerMove: (e: PointerEvent<Element>) => void;
  handlePointerUp: (e: PointerEvent<Element>) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

/** ======= use-carousel-virtual.ts ======= */
export type VirtualItem<T> = {
  key: string | number;
  index: number;
  dataIndex: number;
  style: React.CSSProperties;
  data: T;
};

export interface UseCarouselVirtualOptions<T> {
  items: T[];
  slideWidthPercent: number;
  offsetPercent: number;
  overscan?: number;
  slidesPerView: number;
}

/** ======= carousel.tsx ======= */
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

export interface CarouselContextType {
  currentIndex: number;
  controller: CarouselController | null;
  totalItems: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToSlide: (index: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

/** ======= carousel-arrow.tsx ======= */
export interface CarouselArrowProps {
  direction: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
