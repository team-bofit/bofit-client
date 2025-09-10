import React from 'react';

export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselItem = ({
  children,
  className = '',
}: CarouselItemProps) => {
  return <div className={className}>{children}</div>;
};
