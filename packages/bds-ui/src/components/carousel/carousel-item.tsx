import React from 'react';

// Carousel Item Component
export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};
