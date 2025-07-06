import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles/theme.css';
import { color } from '../../styles/tokens/color.css';

export const title = style({
  ...themeVars.fontStyles.head2_b_16,
  color: color.gray900,
});
