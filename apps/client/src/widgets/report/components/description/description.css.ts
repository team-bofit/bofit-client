import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const description = style({
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray700,
});
