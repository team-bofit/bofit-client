import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.6rem',
});

export const postContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1.6rem',
  gap: '3.6rem',
});

export const postHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const postContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const button = style({
  position: 'fixed',
  bottom: '2.4rem',
  right: '1.6rem',
  left: '1.6rem',
});
