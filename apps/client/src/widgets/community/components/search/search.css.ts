import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const searchAllContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '3.6rem 1.6rem 0',
});

export const searchHistoryContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const searchHistoryTitle = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray800,
});

export const chipContainer = style({
  display: 'flex',
  gap: '1rem',
  overflowWrap: 'anywhere',
  flexWrap: 'wrap',
});

export const placeholder = style({
  height: 'calc(100svh - 20rem)',
});

export const emptyPlaceholder = style({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const virtualRef = style({
  display: 'block',
  height: '2rem',
  width: '1px',
  flexShrink: 0,
});
