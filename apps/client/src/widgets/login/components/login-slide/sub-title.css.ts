import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const descriptionText = style({
  width: '100%',
  height: '100%',
  minHeight: '4.8rem',
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray600,
  whiteSpace: 'pre-wrap',
});
