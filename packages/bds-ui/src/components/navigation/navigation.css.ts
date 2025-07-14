import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles/theme.css';

export const navigationVariants = recipe({
  base: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0.3rem 0 0',
    width: '100%',
    height: '4.8rem',
  },
  variants: {
    backgroundColor: {
      white: { backgroundColor: themeVars.color.whiteBackground },
      primary: { backgroundColor: themeVars.color.primary500 },
      gradient_primary: { background: themeVars.color.gradientPrimary },
      transparent: { backgroundColor: 'transparent' },
    },
    hasZIndex: {
      true: {
        zIndex: themeVars.zIndex.base,
      },
      false: {},
    },
  },
  defaultVariants: {
    backgroundColor: 'transparent',
    hasZIndex: false,
  },
});

export const titleVariants = recipe({
  base: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    ...themeVars.fontStyles.title_sb_16,
  },
  variants: {
    color: {
      white: { color: themeVars.color.white },
      black: { color: themeVars.color.gray900 },
    },
  },
  defaultVariants: {
    color: 'black',
  },
});

export const navigationLeft = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.8rem',
  height: '100%',
  padding: '1rem',
  cursor: 'pointer',
});

export const navigationRightVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    cursor: 'pointer',
  },
  variants: {
    isTextButton: {
      true: {
        padding: 0,
        position: 'absolute',
        right: '0.3rem',
      },
      false: {
        padding: '1rem',
        width: '4.8rem',
      },
    },
  },
  defaultVariants: {
    isTextButton: false,
  },
});
