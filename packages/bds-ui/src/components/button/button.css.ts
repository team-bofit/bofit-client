import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const base = style({
  textAlign: 'center',
  width: '100%',
  padding: '0 2rem',
});

export const buttonVariants = styleVariants({
  primary: [
    base,
    {
      color: themeVars.color.white,
      backgroundColor: themeVars.color.primary500,

      selectors: {
        '&:not(:disabled):active': {
          backgroundColor: themeVars.color.primary600,
        },
        '&:disabled': {
          background: themeVars.color.gray200,
          color: themeVars.color.gray400,
        },
      },
    },
  ],

  error: [
    base,
    {
      color: themeVars.color.white,
      backgroundColor: themeVars.color.error,

      selectors: {
        '&:not(:disabled):active': {
          color: themeVars.color.error,
          backgroundColor: themeVars.color.errorSurface,
        },
        '&:disabled': {
          background: themeVars.color.gray200,
          color: themeVars.color.gray400,
        },
      },
    },
  ],

  border: [
    base,
    {
      color: themeVars.color.primary500,
      border: `1px solid ${themeVars.color.primary500}`,

      selectors: {
        '&:not(:disabled):active': {
          backgroundColor: themeVars.color.primary100,
          border: `1px solid ${themeVars.color.primary500}`,
        },
        '&:disabled': {
          backgroundColor: themeVars.color.white,
          color: themeVars.color.gray400,
          border: `1px solid ${themeVars.color.gray300}`,
        },
      },
    },
  ],
});

export const buttonSizes = styleVariants({
  small: {
    height: '4rem',
    borderRadius: '10px',

    ...themeVars.fontStyles.title_sb_18,
  },

  medium: {
    height: '5rem',
    borderRadius: '12px',

    ...themeVars.fontStyles.head2_b_18,
  },

  large: {
    height: '5.6rem',
    borderRadius: '12px',

    ...themeVars.fontStyles.head2_b_18,
  },
});
