import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const titleVariants = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    whiteSpace: 'pre-line',
  },
  variants: {
    fontColor: {
      gray900: {
        color: themeVars.color.gray900,
      },
      white: {
        color: themeVars.color.white,
      },
    },
    fontStyle: {
      eb_24: {
        ...themeVars.fontStyles.head_eb_24,
      },
      eb_28: {
        ...themeVars.fontStyles.head_eb_28,
      },
    },
  },
});
