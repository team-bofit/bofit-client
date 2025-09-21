import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  position: 'sticky',
  bottom: 0,
  width: '100%',
  height: '5.8rem',

  padding: '1rem',
  backgroundColor: themeVars.color.white,
});

export const horizontalDivider = style({
  width: '0.1rem',
  height: '2.5rem',
  backgroundColor: themeVars.color.gray500,
});
