import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const iconVariants = recipe({
  variants: {
    isActive: {
      true: { color: themeVars.color.error },
      false: { color: themeVars.color.gray600 },
    },
    size: {
      sm: {
        width: '1.6rem',
        height: '1.6rem',
      },
      md: {
        width: '2.4rem',
        height: '2.4rem',
      },
    },
  },
});
