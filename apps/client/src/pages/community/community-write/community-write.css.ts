import { style } from '@vanilla-extract/css';

export const container = style({
  overflowY: 'auto',
  display: 'flex',
  height: '100dvh',
  flexDirection: 'column',
  gap: '3.6rem',
});

export const postContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1.6rem',
  gap: '3.6rem',
  height: '100vh',
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

export const postTitle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const imageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.2rem',
  padding: '1.2rem 0 5.5rem 0',
});

export const postImage = style({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '1.2rem',
});
