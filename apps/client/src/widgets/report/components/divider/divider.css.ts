import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const dividerContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '0 0.4rem',
});

export const title = style({
  ...themeVars.fontStyles.head2_b_14,
  color: themeVars.color.gray700,
  whiteSpace: 'nowrap',
});

export const dividerLine = style({
  color: themeVars.color.gray200,
  height: '0.1rem ',
  width: '100%',
});
