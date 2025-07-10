import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  width: '34.3rem',
  height: '5.1rem',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  padding: '0 1.6rem',
  borderRadius: '12px',
  backgroundColor: '#FEE500',
  gap: '0.7rem',
});

export const text = style({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: '1.715rem',
  fontWeight: 600,
  fontStyle: 'normal',
  lineHeight: '150%',
});
