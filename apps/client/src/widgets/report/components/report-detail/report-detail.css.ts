import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  padding: '0 1.6rem 2.4rem 1.6rem',
});

export const tabContainer = style({
  margin: '1.6rem 0',
});

export const bottomTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const subText = style({
  ...themeVars.fontStyles.body2_r_14,
  color: themeVars.color.gray800,
  textAlign: 'center',
  marginBottom: '1.6rem',
});

export const homeText = style({
  ...themeVars.fontStyles.title_sb_18,
  color: themeVars.color.gray800,
  marginTop: '1.6rem',
  cursor: 'pointer',
  width: 'fit-content',
});
