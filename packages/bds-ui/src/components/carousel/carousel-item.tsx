import React from 'react';

export interface CarouselItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const CarouselItem = ({ children, className }: CarouselItemProps) => {
  return <div className={className}>{children}</div>;
};
