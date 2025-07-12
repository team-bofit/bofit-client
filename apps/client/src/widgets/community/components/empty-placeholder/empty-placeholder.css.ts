import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8rem',
});

export const wrapper = style({
  padding: '0 10.8rem 0 13.2rem',
});

export const content = style({
  whiteSpace: 'pre-wrap',
  color: themeVars.color.gray300,
  ...themeVars.fontStyles.title_sb_16,
  textAlign: 'center',
});
