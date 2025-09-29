import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const DropDownContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'flex-end',
  flexDirection: 'column',
  background: themeVars.color.white,
});

export const DropDownTitle = style({
  ...themeVars.fontStyles.title_sb_16,
  color: themeVars.color.gray800,
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const DropDownIcon = style({
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
});

export const DropDownContent = style({
  position: 'absolute',
  top: '3.2rem',
  width: '9rem',
  display: 'flex',
  padding: '0.6rem 0',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
  borderRadius: '1.2rem',
  border: `1px solid ${themeVars.color.gray200}`,
  background: 'inherit',
  zIndex: themeVars.zIndex.content,
});

export const isRotate = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out',
  },
  variants: {
    isRotate: {
      true: {
        transform: 'rotate(180deg)',
      },
      false: {
        transform: 'rotate(0deg)',
      },
    },
  },
});
