import { style } from '@vanilla-extract/css';

export const listContentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 1.6rem 0',
  gap: '0.8rem',
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const placeholder = style({
  height: 'calc(100svh - 20rem)',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
