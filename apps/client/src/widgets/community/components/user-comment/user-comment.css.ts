import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 1.6rem',
  borderRadius: '12px',
  width: '100%',
  gap: '1.2rem',
  backgroundColor: themeVars.color.whiteBackground,
});

export const userInfoContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const userInfo = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
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
});
