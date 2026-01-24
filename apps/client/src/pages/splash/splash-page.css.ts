import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
});

export const logo = style({
  width: '14rem',
  height: '10.7rem',
});

export const logotype = style({
  width: '15.9rem',
  height: '5.4rem',
});
