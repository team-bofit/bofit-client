import { style } from '@vanilla-extract/css';

export const modalBackdrop = style({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: 'rgba(34, 38, 37, 0.30)',
});
