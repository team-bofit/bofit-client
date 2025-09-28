import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const ImageUploaderContainer = style({
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  width: '100%',
  height: '4.6rem',
  padding: '0.8rem 1.6rem',
  alignItems: 'center',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
});

export const ImageUploadText = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
  display: 'flex',
  padding: '0.6rem 1.6rem',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ImageHiddenInput = style({
  display: 'none',
});
