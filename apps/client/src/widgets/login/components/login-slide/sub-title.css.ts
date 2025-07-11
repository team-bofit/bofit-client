import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const descriptionText = style({
  width: '100%',
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray600,
  whiteSpace: 'pre-wrap',
});
