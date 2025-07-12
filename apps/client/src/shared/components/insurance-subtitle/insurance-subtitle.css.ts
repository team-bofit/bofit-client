import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const subtitleVariants = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  variants: {
    fontColor: {
      primary500: {
        color: themeVars.color.primary500,
      },
      primary100: {
        color: themeVars.color.primary100,
      },
    },
    fontStyle: {
      sb_14: {
        ...themeVars.fontStyles.title_sb_14,
      },
      m_16: {
        ...themeVars.fontStyles.body1_m_16,
      },
    },
  },
});
