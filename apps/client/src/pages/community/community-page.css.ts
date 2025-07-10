import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});
