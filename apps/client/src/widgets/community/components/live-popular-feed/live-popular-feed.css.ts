import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.8rem 1.9rem 2.4rem',
});

export const carousel = style({
  height: '12.9rem',
});

export const carouselItem = style({
  height: '100%',
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
