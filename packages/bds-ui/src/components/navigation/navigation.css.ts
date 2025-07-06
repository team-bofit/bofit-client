import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles/theme.css';

export const navigationVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem 0 1.2rem',
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
    hasLeftIcon: {
      true: { paddingLeft: '1.2rem' },
      false: { paddingLeft: '3.6rem' },
    },
  },
  defaultVariants: {
    backgroundColor: 'transparent',
  },
});

export const titleVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    ...themeVars.fontStyles.title_sb_16,
  },
  variants: {
    color: {
      white: { color: themeVars.color.white },
      black: { color: themeVars.color.gray900 },
    },
  },
  defaultVariants: {
    color: 'white',
  },
});
