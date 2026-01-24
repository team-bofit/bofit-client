import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const title = style({
  color: themeVars.color.gray400,
  ...themeVars.fontStyles.title_sb_14,
  whiteSpace: 'pre-wrap',
});

export const description = style({
  color: themeVars.color.gray900,
  ...themeVars.fontStyles.head_eb_24,
  whiteSpace: 'pre-wrap',
});

export const caption = style({
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body1_m_14,
  whiteSpace: 'pre-wrap',
});
