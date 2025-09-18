import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const topContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  paddingBottom: '2rem',
  borderBottom: `2px solid ${themeVars.color.gray100}`,
});

export const postContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const imageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  paddingTop: '1.2rem',
});

export const postImage = style({
  width: '100%',
  height: '20.2rem',
  borderRadius: '1.2rem',
  objectFit: 'cover',
});
