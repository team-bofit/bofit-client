import { style } from '@vanilla-extract/css';

export const startBottomContainer = style({
  position: 'fixed',
  bottom: 0,

  maxWidth: '43rem',
  width: '100vw',
  display: 'flex',

  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 1.6rem 2.4rem',
  gap: '1.6rem',
});

export const defaultButtonContainer = style({
  position: 'fixed',
  bottom: 0,

  maxWidth: '43rem',
  width: '100vw',

  padding: '0 1.6rem 2.4rem',
});
