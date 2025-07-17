import { style } from '@vanilla-extract/css';
import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles/theme.css';

export const base = style({
  color: themeVars.color.gray900,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
});

export const content = styleVariants({
  sm: [base, themeVars.fontStyles.body2_r_12],
  md: [base, themeVars.fontStyles.body2_r_14],
  lg: [base, themeVars.fontStyles.body2_r_16],
});
