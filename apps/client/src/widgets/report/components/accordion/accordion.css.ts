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
  cursor: 'pointer',
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
});

export const icon = style({
  transition: 'transform 0.3s ease',
});

export const panelAllContainer = recipe({
  base: {
    overflow: 'hidden',
    transition: 'max-height 300ms ease, opacity 300ms ease',
  },
  variants: {
    state: {
      hidden: {
        transition: 'none',
        maxHeight: '0',
        opacity: 0,
      },
      open: {
        maxHeight: 'var(--accordion-height, 0)',
        opacity: 1,
      },
      closed: {
        maxHeight: '0',
        opacity: 0,
      },
    },
  },
  defaultVariants: {
    state: 'hidden',
  },
});

export const panelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  paddingTop: '1.6rem',
});
