import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const infoSection = style({});
export const titleSection = style({});
export const subTitle = style({
  ...themeVars.fontStyles.title_sb_14,
});
export const title = style({});

export const chipList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.8rem',
});
export const homeChipList = style({});
