import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '1.1rem',
  rowGap: '1rem',
});

export const description = style({
  marginTop: '0.4rem',
  marginBottom: '1.6rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body1_m_14,
});
