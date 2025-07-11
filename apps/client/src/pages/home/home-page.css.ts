import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const homePage = style({
  zIndex: themeVars.zIndex.base,
  backgroundColor: themeVars.color.primary500,
  height: '100vh',
});

export const userIcon = style({
  width: '2rem',
  height: '2rem',
  color: themeVars.color.white,
  background: themeVars.color.primary500,
});

export const logoIcon = style({
  width: '7.2rem',
  height: '2.1rem',
  // color: themeVars.color.white,
  // background: themeVars.color.whiteBackground,
});
