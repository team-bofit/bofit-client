import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  // overflow: 'hidden',
  overflowX: 'scroll',
  userSelect: 'none',
});

export const slideContainer = recipe({
  base: {
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    position: 'relative',
    display: 'flex',
  },
  variants: {
    gap: {
      0: { gap: '0px' },
      2: { gap: '2px' },
      4: { gap: '4px' },
      6: { gap: '6px' },
      8: { gap: '8px' },
      10: { gap: '10px' },
      12: { gap: '12px' },
      14: { gap: '14px' },
      16: { gap: '16px' },
      18: { gap: '18px' },
      20: { gap: '20px' },
      24: { gap: '24px' },
      28: { gap: '28px' },
      32: { gap: '32px' },
    },
  },
  defaultVariants: {
    gap: 0,
  },
});

export const carouselItem = style({
  flexShrink: 0,
});

export const slide = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const arrow = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '40px',
  height: '40px',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  transition: 'background-color 0.2s ease',
  pointerEvents: 'auto', // 화살표 버튼은 클릭 가능하도록

  ':active': {
    transform: 'translateY(-50%) scale(0.95)',
  },
});

export const arrowLeft = style([
  arrow,
  {
    left: '10px',
  },
]);

export const arrowRight = style([
  arrow,
  {
    right: '10px',
  },
]);

export const dots = style({
  position: 'absolute',
  bottom: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
});

export const measure = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  visibility: 'hidden',
  pointerEvents: 'none',
});

export const measureItem = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
});
