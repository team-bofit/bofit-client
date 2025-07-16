import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8rem',
});

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: '2.4rem',
});

export const content = style({
  whiteSpace: 'pre-wrap',
  color: themeVars.color.gray300,
  ...themeVars.fontStyles.title_sb_16,
  textAlign: 'center',
});
