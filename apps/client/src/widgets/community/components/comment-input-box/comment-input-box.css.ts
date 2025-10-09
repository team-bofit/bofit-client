import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const commentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  bottom: '0',

  width: '100%',
  maxWidth: '43rem',
  borderTop: `1px solid ${themeVars.color.gray100}`,

  backgroundColor: themeVars.color.whiteBackground,
  zIndex: themeVars.zIndex.overlay,
});

export const inputWrapper = style({
  display: 'flex',
  padding: '1.2rem 1.6rem',
});

export const controlWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

export const imageWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.6rem',
  padding: '0.8rem 0 1.4rem 1.6rem',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title_sb_16,
});

export const buttonWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  padding: '0 1.6rem 0.6rem 0',
});
