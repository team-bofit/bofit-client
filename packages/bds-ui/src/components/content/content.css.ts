import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles/theme.css';
import { color } from '../../styles/tokens/color.css';

export const content = style({
  ...themeVars.fontStyles.body2_r_14,
  color: color.gray900,
});
