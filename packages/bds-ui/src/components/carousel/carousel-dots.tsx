import Indicator from '../indicator/indicator';
import { useCarouselContext } from './carousel';

import * as styles from './carousel.css';

export interface CarouselDotsProps {
  className?: string;
}

/**
 * 캐러셀 페이지네이션
 * @param className
 * @constructor
 */
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
