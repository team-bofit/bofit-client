import { themeVars } from '@bds/ui/styles';
import { recipe } from '@vanilla-extract/recipes';

export const subtitleVariants = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  variants: {
    type: {
      home: {
        ...themeVars.fontStyles.title_sb_14,
        color: themeVars.color.primary100,
      },
      report: {
        ...themeVars.fontStyles.body1_m_16,
        color: themeVars.color.primary500,
      },
    },
  },
});
