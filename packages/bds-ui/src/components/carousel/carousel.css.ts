import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  userSelect: 'none',
});

export const slideContainer = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
});

export const slide = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
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
