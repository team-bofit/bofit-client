import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const topContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '2rem',
  borderBottom: `2px solid ${themeVars.color.gray100}`,
});

export const postContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});
