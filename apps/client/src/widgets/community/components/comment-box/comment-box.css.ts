import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  position: 'fixed',
  bottom: '0',
  padding: '1.4rem 1.6rem',
  width: '100%',
  maxWidth: '43rem',
  gap: '0.8rem',
  backgroundColor: themeVars.color.whiteBackground,
  borderTop: `1px solid ${themeVars.color.gray100}`,
});
