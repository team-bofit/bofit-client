import { themeVars } from '@bds/ui/styles';
import { recipe } from '@vanilla-extract/recipes';

export const titleVariants = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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
      eb_md: {
        ...themeVars.fontStyles.head_eb_24,
      },
      eb_lg: {
        ...themeVars.fontStyles.head_eb_28,
      },
    },
  },
});
