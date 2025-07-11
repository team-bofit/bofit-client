import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  padding: '1.4rem 1.6rem',
  gap: '0.8rem',
  backgroundColor: themeVars.color.whiteBackground,
});
