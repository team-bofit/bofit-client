import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const avatarVariants = recipe({
  base: {
    borderRadius: '100%',
    overflow: 'hidden',
  },
  variants: {
    size: {
      sm: {
        width: '3rem',
        height: '3rem',
      },
      md: {
        width: '3.6rem',
        height: '3.6rem',
      },
      lg: {
        width: '12.8rem',
        height: '12.8rem',
      },
    },
  },
});

export const imgVariants = recipe({
  base: {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    objectFit: 'cover',
  },
});

export const fallback = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    backgroundColor: themeVars.color.whiteBackground,
  },
});
