import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@bds/ui/styles';

export const accordionContainer = style({
  backgroundColor: themeVars.color.white,
  width: '100%',
  display: 'flex',
  padding: '1.6rem 2rem',
  flexDirection: 'column',
  borderRadius: '16px',
});

export const headerContainer = style({
  display: 'flex',
  gap: '1.2rem',
});

export const headerContentsContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
  width: '100%',
});

export const iconContainer = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

export const icon = style({
  transition: 'transform 0.3s ease',
});

export const panelContainer = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 0.1s ease, opacity 0.3s ease, padding 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.4rem',
  },
  variants: {
    expanded: {
      true: {
        maxHeight: '100%',
        opacity: 1,
        paddingTop: '2.4rem ',
      },
      false: {
        maxHeight: '0',
        opacity: '0',
      },
    },
  },
});
