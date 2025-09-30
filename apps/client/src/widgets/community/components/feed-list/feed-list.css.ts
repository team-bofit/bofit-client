import { style } from '@vanilla-extract/css';

export const listAllContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0 1.6rem',
});

export const chipContainer = style({
  display: 'flex',
  gap: '0.8rem',
  paddingTop: '1.2rem',

  overflowX: 'auto',
  overflowY: 'hidden',
  flexWrap: 'nowrap',
  WebkitOverflowScrolling: 'touch',
  scrollSnapType: 'x proximity',
});

export const chip = style({
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
});

export const logo = style({
  width: '1.8rem',
  height: '1.8rem',
});

export const listContentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '1.2rem',
  gap: '0.8rem',
});

export const dropDownContainer = style({
  display: 'flex',
  justifyContent: 'end',
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
