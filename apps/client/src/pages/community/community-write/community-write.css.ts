import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  gap: '3.6rem',
});

export const postContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1.6rem',
  gap: '3.6rem',
  height: '100vh',
});

export const postHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const postContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const postTitle = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const postCategory = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});
