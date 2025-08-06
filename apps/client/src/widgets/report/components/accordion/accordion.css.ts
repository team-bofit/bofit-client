import { keyframes, style } from '@vanilla-extract/css';
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

const accordionDown = keyframes({
  '0%': { height: '0' },
  '100%': { height: 'var(--accordion-height)' },
});

const accordionUp = keyframes({
  '0%': { height: 'var(--accordion-height)' },
  '100%': { height: '0' },
});

export const panelAllContainer = recipe({
  base: {
    overflow: 'hidden',
    height: 'var(--accordion-height, 0)',
    transition: 'height 0.3s ease',
  },
  variants: {
    isOpen: {
      true: {
        display: 'block',
        animation: `${accordionDown} 0.3s ease forwards`,
      },
      false: {
        display: 'block',
        animation: `${accordionUp} 0.3s ease forwards`,
      },
    },
  },
});

export const panelContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  paddingTop: '1.6rem',
});
