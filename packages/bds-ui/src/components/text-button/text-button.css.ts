import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles';
import { fontStyles } from '../../styles/tokens/font-style';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.2rem',
});

export const textButtonColor = styleVariants({
  black: [
    base,
    {
      color: themeVars.color.gray800,

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

export const textButtonSizes = styleVariants({
  sm: {
    ...fontStyles.title_sb_16,
    height: '2.4rem',
  },
});

export type textButtonColor = keyof typeof textButtonColor;
export type textButtonSizes = keyof typeof textButtonSizes;
