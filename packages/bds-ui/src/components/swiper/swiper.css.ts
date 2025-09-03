import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  userSelect: 'none',
});

export const slideContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
});

export const slide = style({
  flex: '0 0 100%',
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
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '8px',
  zIndex: 10,
});

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export const activeDot = style({
  backgroundColor: 'white',
});
