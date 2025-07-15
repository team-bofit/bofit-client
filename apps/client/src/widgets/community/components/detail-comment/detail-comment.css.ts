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
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const userInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const userInfoLeft = style({
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

export const commentNum = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const commentNumColor = style({
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray600,
});
