import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const commentMapContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const feedInfo = style({
  display: 'flex',
  gap: '1rem',
});

export const likeInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const likeIcon = style({
  cursor: 'pointer',
});

export const commentInfo = style({
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const feedInfoNum = style({
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

export const virtualRef = style({
  display: 'block',
  height: '2rem',
  width: '1px',
  flexShrink: 0,
});
