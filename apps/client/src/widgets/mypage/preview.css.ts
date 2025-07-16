import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const previewContainer = style({
  width: '100%',
  borderRadius: '2.4rem 2.4rem 0 0',
  background: themeVars.color.white,
  paddingTop: '2.4rem',
});

export const previewEmptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100svh - 35.6rem)',
  maxHeight: 'calc(100svh - 12rem)',
  overflowY: 'auto',
  boxShadow: `0px 0px 30px 0px ${themeVars.color.gray300}`,
});

export const previewContentSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: 'calc(100svh - 35.6rem)',
  maxHeight: 'calc(100svh - 12rem)',
  overflowY: 'auto',
  boxShadow: `0px 0px 30px 0px ${themeVars.color.gray300}`,
  gap: '1.6rem',
  padding: '1.6rem 1.6rem 0 1.6rem',
});
