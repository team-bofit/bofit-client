import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const base = style({
  padding: '0.6rem 1.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const buttonFontSize = styleVariants({
  sm: {
    ...themeVars.fontStyles.title_sb_16,
  },
  lg: {
    ...themeVars.fontStyles.head_eb_24,
  },
});

export const buttonColor = styleVariants({
  black: [
    base,
    {
      color: themeVars.color.gray900,

      selectors: {
        '&:not(:disabled):active': {
          color: themeVars.color.gray700,
        },
        '&:disabled': {
          color: themeVars.color.gray400,
        },
      },
    },
  ],

  white: [
    base,
    {
      color: themeVars.color.white,

      selectors: {
        '&:not(:disabled):active': {
          color: themeVars.color.primary100,
        },
        '&:disabled': {
          color: themeVars.color.gray400,
        },
      },
    },
  ],

  primary: [
    base,
    {
      color: themeVars.color.primary500,

      selectors: {
        '&:not(:disabled):active': {
          color: themeVars.color.primary600,
        },
        '&:disabled': {
          color: themeVars.color.gray400,
        },
      },
    },
  ],
});
