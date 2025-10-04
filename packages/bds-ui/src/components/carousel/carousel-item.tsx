import React from 'react';

export interface CarouselItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * 캐러셀 아이템 : 캐러셀 내부에 들어가는 요소들
 * @param children
 * @param className
 * @constructor
 */
export const CarouselItem = ({ children, className }: CarouselItemProps) => {
  return <div className={className}>{children}</div>;
};
