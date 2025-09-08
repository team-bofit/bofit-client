import React from 'react';

import * as styles from './carousel.css';
import { useCarouselContext } from './carousel-context';

// Carousel Dots Component
export interface CarouselDotsProps {
  className?: string;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  className = '',
}) => {
  const { currentIndex, totalItems, goToSlide } = useCarouselContext();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div className={`${styles.dots} ${className}`}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          className={`${styles.dot} ${
            index === currentIndex ? styles.activeDot : ''
          }`}
          onClick={() => goToSlide(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
