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
