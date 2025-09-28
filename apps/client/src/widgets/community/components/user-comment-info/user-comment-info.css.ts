import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const commentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const userInfoContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'transparent',
});

export const userInfo = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
  backgroundColor: 'transparent',
});

export const nickName = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray900,
});

export const timestamp = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray600,
});

export const button = style({
  display: 'flex',
  alignItems: 'center',
});

export const comment = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray900,
  backgroundColor: 'transparent',
});

export const imageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const postImage = style({
  width: '100%',
  borderRadius: '1.2rem',
});
