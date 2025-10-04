import { style } from '@vanilla-extract/css';

import { zIndex } from '../../styles/tokens/z-index';

export const container = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  overflowX: 'scroll',
  userSelect: 'none',
});

export const slideContainer = style({
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  position: 'relative',
  display: 'flex',
  gap: '10px',
  userSelect: 'none',
  WebkitUserSelect: 'none',
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
