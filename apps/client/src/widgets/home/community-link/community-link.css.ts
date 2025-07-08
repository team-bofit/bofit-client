import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const linkContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6.8rem',
  width: '31.1rem',
  height: '18rem',
  alignSelf: 'stretch',
  borderRadius: '2rem',
  background: themeVars.color.gray100,
  padding: '1.6rem 2rem 1rem 2.2rem',
  zIndex: 1,
});

export const linkDescription = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.primary900,
  whiteSpace: 'pre-wrap',
});

export const linkImage = style({
  position: 'absolute',
  height: '11rem',
  left: '20rem',
  top: '3rem',
  bottom: '1.6rem',
  zIndex: 1,
});

export const navigateContainer = style({
  width: '100%',
  height: '3.2rem',
  padding: '0.6rem 0.8rem 0.6rem 1.6rem',
  gap: '0.4rem',
  display: 'flex',
  justifyContent: 'flex-end',
  cursor: 'pointer',
});

export const navigateText = style({
  ...themeVars.fontStyles.title_sb_16,
});
