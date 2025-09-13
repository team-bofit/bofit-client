import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles';
import { fontStyles } from '../../styles/tokens/font-style';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
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
          color: themeVars.color.gray100,
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
  xsm: {
    ...fontStyles.body1_m_12,
    height: '2.8rem',
    padding: '0.4rem 0.6rem 0.4rem 1.2rem',
    gap: '0.2rem',
  },
  sm: {
    ...fontStyles.title_sb_16,
    height: '3.6rem',
    padding: '0.6rem 0.8rem 0.6rem 1.6rem',
    gap: '0.4rem',
  },
});

export type textButtonColor = keyof typeof textButtonColor;
export type textButtonSizes = keyof typeof textButtonSizes;
