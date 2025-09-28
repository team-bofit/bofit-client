import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 1.2rem',

  width: '24.7rem',
  height: '12.9rem',

  borderRadius: '1.2rem',
  backgroundColor: themeVars.color.whiteBackground,
});

export const contentWrapper = style({
  display: '-webkit-box',
  marginTop: '0.6rem',
  ...themeVars.fontStyles.body2_r_14,
  color: themeVars.color.gray900,

  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const stats = style({
  display: 'flex',
  margin: '1rem 0 0.8rem',
  gap: '0.8rem',
});

export const heart = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const reply = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const statsNumber = style({
  ...themeVars.fontStyles.head2_b_14,
  color: themeVars.color.gray600,
});
