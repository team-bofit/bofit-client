import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const priceContainer = style({
  display: 'flex',
  height: '3rem',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: themeVars.color.primary500,
  ...themeVars.fontStyles.head_eb_20,
});

export const month = style({
  marginRight: '0.4rem',
});

export const price = style({
  marginRight: '0.2em',
});
