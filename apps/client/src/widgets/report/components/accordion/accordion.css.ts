import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const accordionContainer = style({
  backgroundColor: themeVars.color.white,
  width: '100%',
  display: 'flex',
  padding: '1.6rem 2rem',
  flexDirection: 'column',
  gap: '2.4rem',
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
});
