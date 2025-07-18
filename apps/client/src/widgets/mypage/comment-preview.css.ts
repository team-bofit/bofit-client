import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const commentContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingBottom: '1.2rem',
  borderBottom: `1px solid ${themeVars.color.gray300}`,
  cursor: 'pointer',
});

export const commentContent = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.8rem',
});
