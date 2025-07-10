import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    padding: '1.4rem 2.4rem',
    height: '4.8rem',
    alignItems: 'center',
    borderRadius: '8px',
    transition: 'border 0.01s ease-in-out',
    selectors: {
      '&:focus-within': {
        border: `1px solid ${themeVars.color.primary500}`,
      },
    },
  },
  variants: {
    bgColor: {
      gray: {
        backgroundColor: themeVars.color.gray100,
      },
      white: {
        backgroundColor: themeVars.color.whiteBackground,
      },
    },

    hasError: {
      true: {
        border: `1px solid ${themeVars.color.error}`,
        selectors: {
          '&:focus-within': {
            border: `1px solid ${themeVars.color.error}`,
          },
        },
      },
      false: {
        border: '1px solid transparent',
      },
    },
  },
});

export const inputContent = style({
  width: '100%',
  ...themeVars.fontStyles.body2_r_14,
  color: themeVars.color.gray600,
  outline: 'none',
  background: 'transparent',
  border: 'none',
  selectors: {
    '&:focus::placeholder': {
      color: 'transparent',
    },
  },
});

export const inputFilled = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray900,
});
