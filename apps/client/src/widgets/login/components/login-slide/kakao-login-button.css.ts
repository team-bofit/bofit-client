import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  width: '100%',
  height: '5.1rem',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '0 1.6rem',
  borderRadius: '12px',
  backgroundColor: '#FEE500',
  gap: '0.7rem',
  cursor: 'pointer',
});

export const text = style({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: '1.715rem',
  fontWeight: 600,
  fontStyle: 'normal',
  lineHeight: '150%',
});

export const icons = style({
  cursor: 'pointer',
  transition: 'color 0.1s',
});
