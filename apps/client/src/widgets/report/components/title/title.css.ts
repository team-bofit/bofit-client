import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const title = recipe({
  variants: {
    category: {
      mainCategory: { ...themeVars.fontStyles.head_eb_24 },
      subCategory: { ...themeVars.fontStyles.head_eb_20 },
    },
  },
});
