import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  padding: '0 1.6rem 2.4rem 1.6rem',
});

export const section = style({
  scrollMarginTop: '7.2rem',
});

export const tabStickyContainer = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  padding: '1.6rem 0',
  backgroundColor: themeVars.color.whiteBackground,
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
  cursor: 'pointer',
  width: 'fit-content',
  padding: '1rem 1.6rem',
  marginTop: '0.8rem',
});
