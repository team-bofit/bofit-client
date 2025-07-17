import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const homePage = style({
  zIndex: themeVars.zIndex.base,
  backgroundColor: themeVars.color.primary500,
  boxShadow: `0px 0px 30px 0px ${themeVars.color.gray300}`,
});

export const userIcon = style({
  width: '2rem',
  height: '2rem',
  cursor: 'pointer',
  color: themeVars.color.white,
  background: themeVars.color.primary500,
});

export const logoIcon = style({
  width: '7.2rem',
  height: '2.1rem',
  cursor: 'pointer',
});
