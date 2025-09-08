import React, { useCallback } from 'react';

import { Icon } from '../../icons';
import { useCarouselContext } from './carousel-context';
import * as styles from './carousel.css';

// Carousel Arrow Component
export interface CarouselArrowProps {
  direction: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CarouselArrow: React.FC<CarouselArrowProps> = ({
  direction,
  children,
  className = '',
  onClick,
}) => {
  const { goToNext, goToPrev, canGoNext, canGoPrev } = useCarouselContext();

  const isDisabled = direction === 'left' ? !canGoPrev : !canGoNext;

  const handleClick = useCallback(() => {
    if (isDisabled) return;

    if (onClick) {
      onClick();
    } else {
      direction === 'left' ? goToPrev() : goToNext();
    }
  }, [direction, goToNext, goToPrev, onClick, isDisabled]);

  const arrowClass =
    direction === 'left' ? styles.arrowLeft : styles.arrowRight;
  const iconName = direction === 'left' ? 'caret_left_lg' : 'caret_right_lg';

  return (
    <button
      className={`${arrowClass} ${className}`}
      onClick={handleClick}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    >
      {children || <Icon name={iconName} color="white" />}
    </button>
  );
};
