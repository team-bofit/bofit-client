import { style, styleVariants } from '@vanilla-extract/css';

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

export const buttonVariants = styleVariants({
  default: {
    background: themeVars.color.gradientPrimary,
    cursor: 'pointer',
  },
  inactive: {
    background: themeVars.color.gray200,
    cursor: 'default',
  },
});

export const iconWrapper = style({
  width: '3.2rem',
  height: '3.2rem',
  flexShrink: 0,
});

export const iconVariants = styleVariants({
  default: {
    color: themeVars.color.white,
  },
  inactive: {
    color: themeVars.color.gray400,
  },
});
