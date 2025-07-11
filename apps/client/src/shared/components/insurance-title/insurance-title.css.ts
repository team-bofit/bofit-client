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
    size: {
      md: {
        ...themeVars.fontStyles.head_eb_24,
      },
      lg: {
        ...themeVars.fontStyles.head_eb_28,
      },
    },
    color: {
      white: {
        color: themeVars.color.white,
      },
      black: {
        color: themeVars.color.gray900,
      },
    },
  },
});
