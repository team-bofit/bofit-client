import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '0.8rem',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
  gap: '2rem',
  cursor: 'pointer',
});

export const contentBox = style({
  display: '-webkit-box',
  overflow: 'hidden',
  flexDirection: 'column',
  gap: '1.2rem',
  cursor: 'pointer',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
});

export const feedInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const feedInfoLeft = style({
  display: 'flex',
  gap: '0.6rem',
});

export const infoContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const nickName = style({
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.body1_m_12,
});

export const point = style({
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body1_m_12,
});

export const createdAt = style({
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body1_m_12,
});

export const feedInfoRight = style({
  display: 'flex',
  gap: '0.8rem',
});

export const postInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const postInfoNum = style({
  ...themeVars.fontStyles.head2_b_14,
  color: themeVars.color.gray600,
});
