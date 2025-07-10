import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const button = style({
  textAlign: 'left',
  padding: '2rem 1.2rem 2rem 1.6rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.title_sb_16,
});
