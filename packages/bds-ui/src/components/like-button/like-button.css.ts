import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const iconVariants = recipe({
  variants: {
    isActive: {
      true: { color: themeVars.color.error },
      false: { color: themeVars.color.gray600 },
    },
  },
});
