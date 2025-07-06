import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const baseButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '5.6rem',
  height: '5.6rem',
  borderRadius: '50px',
  flexShrink: 0,

  selectors: {
    '&:not(:disabled):active': {
      background: themeVars.color.primary600,
      cursor: 'pointer',
    },
  },
});

export const button = recipe({
  base: baseButton,
  variants: {
    state: {
      default: {
        background: themeVars.color.gradientPrimary,
        cursor: 'pointer',
      },
      inactive: {
        background: themeVars.color.gray200,
        cursor: 'default',
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const iconWrapper = recipe({
  base: {
    width: '3.2rem',
    height: '3.2rem',
    flexShrink: 0,
  },
  variants: {
    state: {
      default: {
        color: themeVars.color.white,
      },
      inactive: {
        color: themeVars.color.gray400,
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;
