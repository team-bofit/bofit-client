import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const summarizeContainer = style({
  width: '100%',
  display: 'flex',
  position: 'relative',
});

export const backgroundImage = style({
  zIndex: themeVars.zIndex.base,
  position: 'absolute',
  top: '1.4rem',
  right: '0',
  display: 'flex',
  width: '17rem',
  height: '17rem',
  justifyContent: 'center',
  alignItems: 'center',
});

export const topContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.8rem',
  alignSelf: 'stretch',
});

export const insuranceContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex',
  gap: '0.6rem',
  alignSelf: 'stretch',
});

export const titleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',
  alignSelf: 'stretch',
});

export const chipContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.4rem',
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.4rem',
  alignSelf: 'stretch',
});

export const contentContainer = style({
  position: 'relative',
  zIndex: themeVars.zIndex.content,
  display: 'flex',
  width: '100%',
  margin: '3.2rem 1.6rem 1.6rem 1.6rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
});
