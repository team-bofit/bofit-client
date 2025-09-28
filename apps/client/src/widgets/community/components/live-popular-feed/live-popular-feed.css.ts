import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.8rem 1.9rem 3.6rem',
});

export const titleContainer = style({
  display: 'inline-flex',
  gap: '0.2rem',
  marginBottom: '0.8rem',
});

export const indicatorWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.2rem',
});

export const carousel = style({
  display: 'flex',
  overflowX: 'auto',
  gap: '1rem',
  scrollSnapType: 'x mandatory',

  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },
});
