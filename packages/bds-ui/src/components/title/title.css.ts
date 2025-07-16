import { styleVariants } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles/theme.css';
import { color } from '../../styles/tokens/color.css';

export const base = style({
  color: themeVars.color.primary900,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
});

export const titleVariants = styleVariants({
  bd_sm: [base, { ...themeVars.fontStyles.head2_b_16 }],
  bd_md: [base, { ...themeVars.fontStyles.head2_b_20 }],
  eb_md: [base, { ...themeVars.fontStyles.head_eb_20 }],
});
