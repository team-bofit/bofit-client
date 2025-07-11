import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const maturityContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.title_sb_14,
});
