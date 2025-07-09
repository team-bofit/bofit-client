import { themeVars } from '@bds/ui/styles';
import { recipe } from '@vanilla-extract/recipes';

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
        minHeight: '3.6rem',
      },
      md: {
        backgroundColor: themeVars.color.gray100,
        padding: '1.2rem 1.2rem 1.2rem 0.4rem',
        minHeight: '4.8rem',
      },
    },
  },
});

export const iconContainer = recipe({
  base: {
    aspectRatio: '1/1',
  },
  variants: {
    size: {
      sm: {
        padding: '0.2rem',
      },
      md: {
        padding: '0.24rem',
      },
    },
  },
});

export const contents = recipe({
  base: {
    color: themeVars.color.gray800,
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    size: {
      sm: {
        ...themeVars.fontStyles.body2_r_12,
      },
      md: {
        ...themeVars.fontStyles.body2_r_14,
      },
    },
  },
});
