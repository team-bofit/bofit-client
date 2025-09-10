import React from 'react';

import { carouselItem } from './carousel.css';

export interface CarouselItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const CarouselItem = ({ children, style }: CarouselItemProps) => {
  return (
    <div className={carouselItem} style={style}>
      {children}
    </div>
  );
};
