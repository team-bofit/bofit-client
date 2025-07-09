import { themeVars } from '@bds/ui/styles';
import { recipe } from '@vanilla-extract/recipes';

export const title = recipe({
  variants: {
    catogory: {
      mainCategory: { ...themeVars.fontStyles.head_eb_24 },
      subCategory: { ...themeVars.fontStyles.head_eb_20 },
    },
  },
});
