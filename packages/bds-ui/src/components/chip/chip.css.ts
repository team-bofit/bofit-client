import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles/theme.css';

export const chipVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...themeVars.fontStyles.body1_m_12,
    color: themeVars.color.gray800,
  },

  variants: {
    color: {
      gray: { backgroundColor: themeVars.color.whiteBackground },
      primary: { backgroundColor: themeVars.color.primary200 },
    },
    size: {
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
  },
  defaultVariants: {
    color: 'gray',
    size: 'rectangular',
    outline: false,
  },
});
