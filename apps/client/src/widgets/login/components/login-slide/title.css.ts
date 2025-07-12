import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const headerText = style({
  ...themeVars.fontStyles.head_eb_24,
  color: themeVars.color.gray900,
  whiteSpace: 'pre-wrap',
});
