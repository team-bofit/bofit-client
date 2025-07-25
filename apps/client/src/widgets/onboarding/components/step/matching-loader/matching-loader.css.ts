import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
  height: '100vh',
  textAlign: 'center',
});

export const subTitle = style({
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.title_sb_14,
});

export const title = style({
  color: themeVars.color.gray900,
  ...themeVars.fontStyles.head_eb_24,
  whiteSpace: 'pre-wrap',
});
