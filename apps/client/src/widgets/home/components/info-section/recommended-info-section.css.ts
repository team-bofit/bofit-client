import { style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const infoSection = style({
  width: '100%',
});

export const backgroundLogo = style({
  position: 'absolute',
  top: '13.6rem',
  right: '0',
});

export const titleSection = style({
  padding: '2.2rem 1.6rem 6.2rem 1.6rem',
  // zIndex: themeVars.zIndex.content,
});

export const subTitle = style({
  ...themeVars.fontStyles.title_sb_14,
  color: themeVars.color.gray100,
  marginBottom: '0.4rem',
  // zIndex: themeVars.zIndex.content,
});
export const title = style({
  ...themeVars.fontStyles.head_eb_28,
  color: themeVars.color.white,
});

export const chipList = style({
  marginTop: '0.9rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.4rem',
});

export const homeChipList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.8rem',
  marginTop: '1.6rem',
  overflowX: 'auto',
  paddingBottom: '2.2rem',
});

export const homeChipIcon = style({
  height: '5rem',
  width: '5rem',
});

export const bottomButton = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '1.2rem',
});

export const button = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '0.8rem',

  cursor: 'pointer',
  padding: '0.6rem 0.8rem 0.6rem 1.6rem',

  color: themeVars.color.white,
  ...themeVars.fontStyles.title_sb_16,
});
