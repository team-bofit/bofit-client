import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const previewContainer = style({
  width: '100%',
  borderRadius: '2.4rem 2.4rem 0 0',
  background: themeVars.color.white,
  paddingTop: '2.4rem',
});

export const previewContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 35.6rem)',
});
