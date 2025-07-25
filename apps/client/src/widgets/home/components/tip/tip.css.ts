import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const tipContainer = recipe({
  base: {
    position: 'relative',
    width: '20rem',
    height: '11.8rem',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.3rem',
    padding: '1.5rem 1.6rem 1.6rem 1.6rem',
    flexShrink: 0,
  },
  variants: {
    bgColor: {
      gray: { backgroundColor: themeVars.color.gray600 },
      green: { backgroundColor: themeVars.color.primary500 },
    },
  },
});

export const backgroundImage = style({
  position: 'absolute',
  top: '0',
  right: '0',

  width: '10rem',
  height: '10rem',
  zIndex: themeVars.zIndex.content,
});

export const bulbSvg = style({
  opacity: 0.5,
});

export const tipTitle = style({
  ...themeVars.fontStyles.head2_b_16,
  color: themeVars.color.white,
  zIndex: themeVars.zIndex.base,
});

export const tipContents = style({
  ...themeVars.fontStyles.title_sb_14,
  color: themeVars.color.white,
  zIndex: themeVars.zIndex.base,
});
