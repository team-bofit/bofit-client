import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const headerText = style({
  ...themeVars.fontStyles.head_eb_24,
  color: themeVars.color.gray900,
  whiteSpace: 'pre-wrap',
});
