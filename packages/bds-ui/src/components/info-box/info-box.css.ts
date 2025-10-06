import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const additionalContainer = recipe({
  base: {
    gap: '0.4rem',
    borderRadius: '8px',
    display: 'flex',
    width: '100%',
  },
  variants: {
    size: {
      sm: {
        backgroundColor: themeVars.color.whiteBackground,
        padding: '0.8rem 0.8rem 0.8rem 0.4rem',
      },
      md: {
        backgroundColor: themeVars.color.gray100,
        padding: '1.2rem 1.2rem 1.2rem 0.4rem',
      },
    },
  },
});

export const iconContainer = style({
  aspectRatio: '1/1',
  padding: '0.2rem',
});

export const contents = recipe({
  base: {
    color: themeVars.color.gray800,
  },
  variants: {
    size: {
      sm: {
        ...themeVars.fontStyles.body2_r_12,
        padding: '0.2rem 0 0.1rem 0',
      },
      md: {
        ...themeVars.fontStyles.body2_r_14,
        padding: '0.2rem 0',
      },
    },
  },
});
