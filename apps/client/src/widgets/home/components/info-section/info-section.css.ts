import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const infoSection = style({
  width: '100%',
});

export const backgroundLogo = style({
  position: 'absolute',
  top: '7.1rem',
  right: '0',
  zIndex: themeVars.zIndex.auto,
});

export const titleSection = style({
  padding: '4.1rem 1.6rem 0 1.6rem',
  zIndex: themeVars.zIndex.content,
  position: 'relative',
});

export const subTitle = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.white,
  marginBottom: '0.4rem',
});

export const title = style({
  ...themeVars.fontStyles.head_eb_28,
  color: themeVars.color.white,
});

export const homeChipList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.8rem',
  overflowX: 'auto',
  padding: '1.8rem 0 2.2rem 0',
});

globalStyle('.info-section_homeChipList__10zj37s5  .swiper-wrapper', {
  transitionTimingFunction: 'linear',
});

export const homeChipIcon = style({
  height: '5rem',
  width: '5rem',
});

export const bottomButton = style({
  padding: '0 1.6rem 2.4rem 1.6rem',
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
