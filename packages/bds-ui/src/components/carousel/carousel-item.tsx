import React from 'react';

import { carouselItem } from './carousel.css';

export interface CarouselItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const CarouselItem = ({ children, className }: CarouselItemProps) => {
  return <div className={className}>{children}</div>;
};
