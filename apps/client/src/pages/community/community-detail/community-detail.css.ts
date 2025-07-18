import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem 1.6rem 0 1.6rem',
  gap: '1.6rem',
});

export const commentMapContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const commentInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const commentNum = style({
  ...themeVars.fontStyles.head2_b_16,
  color: themeVars.color.gray800,
});

export const commentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',

  marginBottom: '9.6rem',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const placeholder = style({
  height: 'calc(100svh - 50rem)',
});
