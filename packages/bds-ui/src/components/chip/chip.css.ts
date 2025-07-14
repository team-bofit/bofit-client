import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles/theme.css';

export const chipVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...themeVars.fontStyles.body1_m_12,
  },

  variants: {
    fontColor: {
      gray: { color: themeVars.color.gray800 },
      primary: { color: themeVars.color.primary600 },
    },
    backgroundColor: {
      gray: { backgroundColor: themeVars.color.whiteBackground },
      primary100: { backgroundColor: themeVars.color.primary100 },
      primary200: { backgroundColor: themeVars.color.primary200 },
    },
    shape: {
      rectangular: {
        padding: '0.4rem 1rem',
        borderRadius: '6px',
      },
      rounded: {
        padding: '0.6rem 1.2rem',
        borderRadius: '50px',
      },
    },
    outline: {
      true: {
        border: `1px solid ${themeVars.color.gray100}`,
      },
      false: {},
    },
    zIndex: {
      auto: { zIndex: themeVars.zIndex.auto },
      base: { zIndex: themeVars.zIndex.base },
      content: { zIndex: themeVars.zIndex.content },
      overlay: { zIndex: themeVars.zIndex.overlay },
    },
  },
  defaultVariants: {
    fontColor: 'gray',
    backgroundColor: 'gray',
    shape: 'rounded',
    outline: false,
  },
});
