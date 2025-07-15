import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const maturityContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.title_sb_14,
});
