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

export const leftButtonWrapper = style({
  display: 'flex',
  paddingRight: '1rem',
  borderRight: `1px solid ${themeVars.color.gray400}`,
});
