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
  },
  variants: {
    isOpen: { true: {}, false: {} },
    ready: {
      true: {
        transition: 'max-height 300ms ease, opacity 300ms ease',
      },
      false: {
        transition: 'none',
        maxHeight: '0px',
        opacity: 0,
      },
    },
  },
  compoundVariants: [
    {
      variants: { isOpen: true, ready: true },
      style: {
        maxHeight: 'var(--accordion-height, 0px)',
        opacity: 1,
      },
    },
    {
      variants: { isOpen: false, ready: true },
      style: {
        maxHeight: '0px',
        opacity: 0,
      },
    },
  ],
});

export const panelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  paddingTop: '1.6rem',
});
