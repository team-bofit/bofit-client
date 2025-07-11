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
    type: {
      report: {
        ...themeVars.fontStyles.head_eb_24,
        color: themeVars.color.gray900,
      },
      home: {
        ...themeVars.fontStyles.head_eb_28,
        color: themeVars.color.white,
      },
    },
  },
});
