import { style } from '@vanilla-extract/css';

import { zIndex } from '../../styles/tokens/z-index';

export const container = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  overflowX: 'scroll',
  userSelect: 'none',
  WebkitOverflowScrolling: 'touch',
  touchAction: 'pan-x',
});

export const slideContainer = style({
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  position: 'relative',
  display: 'flex',
  gap: '1rem',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'pan-x',
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
  width: '4rem',
  height: '4rem',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: zIndex.overlay,
  transition: 'background-color 0.2s ease',
  pointerEvents: 'auto',

  ':active': {
    transform: 'translateY(-50%) scale(0.95)',
  },
});

export const arrowLeft = style([
  arrow,
  {
    left: '1rem',
  },
]);

export const arrowRight = style([
  arrow,
  {
    right: '1rem',
  },
]);

export const dots = style({
  position: 'absolute',
  bottom: '-2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: zIndex.overlay,
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
