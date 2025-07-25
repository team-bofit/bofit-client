import { globalStyle, style } from '@vanilla-extract/css';

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
  zIndex: themeVars.zIndex.content,
  position: 'relative',
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
  overflowX: 'auto',
});

globalStyle(`${homeChipList}  .swiper-wrapper`, {
  transitionTimingFunction: 'linear',
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
  cursor: 'pointer',
  padding: '0.6rem 0.8rem 0.6rem 1.6rem',

  color: themeVars.color.white,
  ...themeVars.fontStyles.title_sb_16,
});
