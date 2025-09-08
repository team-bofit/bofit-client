import { style } from '@vanilla-extract/css';

export const healthContainer = style({
  margin: '2.7rem 1.6rem 16rem 1.6rem',
});

export const titleContainer = style({
  marginBottom: '4.8rem',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5.2rem',
});

export const nextButtonContainer = style({
  position: 'fixed',
  bottom: 0,

  maxWidth: '43rem',
  width: '100vw',

  padding: '0 1.6rem 2.4rem',
});
