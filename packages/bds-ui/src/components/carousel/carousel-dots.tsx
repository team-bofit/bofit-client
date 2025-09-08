import React from 'react';

import Indicator from '../indicator/indicator';
import { useCarouselContext } from './carousel-context';

import * as styles from './carousel.css';

export interface CarouselDotsProps {
  className?: string;
}

export const CarouselDots = ({ className = '' }: CarouselDotsProps) => {
  const { currentIndex, totalItems } = useCarouselContext();

  if (totalItems <= 1) {
    return null;
  }

  return (
    <div className={`${styles.dots} ${className}`}>
      <Indicator current={currentIndex} total={totalItems} />
    </div>
  );
};
