import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const homePage = style({
  backgroundColor: themeVars.color.primary500,
  height: '100vh',
});

export const userIcon = style({
  width: '2.4rem',
  height: '2.4rem',
});

export const logoIcon = style({
  width: '7.2rem',
  height: '2.1rem',
  // color: themeVars.color.white,
  // background: themeVars.color.whiteBackground,
});
