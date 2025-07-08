import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
});

export const barBackground = style({
  background: themeVars.color.gray100,
  height: '0.5rem',
  overflow: 'hidden',
});

export const barFill = style({
  background: themeVars.color.primary500,
  height: '0.5rem',
  transition: 'width 0.3s ease',
});

export const text = style({
  display: 'flex',
  margin: '1.2rem 1.6rem 0',
  justifyContent: 'space-between',
  ...themeVars.fontStyles.title_sb_14,
});

export const textCurrent = style({
  color: themeVars.color.primary500,
});

export const textTotal = style({
  color: themeVars.color.gray300,
});

export const textDone = style({
  color: themeVars.color.primary500,
});
