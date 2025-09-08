import { createContext, useContext } from 'react';

// Carousel Context
export interface CarouselContextType {
  currentIndex: number;
  totalItems: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToSlide: (index: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
