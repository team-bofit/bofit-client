import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const linkContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6.8rem',
  width: '100%',
  height: '18rem',
  alignSelf: 'stretch',
  borderRadius: '20px',
  backgroundColor: themeVars.color.gray100,
  padding: '1.6rem 2rem 1rem 2.2rem',
  zIndex: themeVars.zIndex.content,
});

export const linkDescription = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.primary900,
  whiteSpace: 'pre-wrap',
  zIndex: themeVars.zIndex.content,
});

export const linkImage = style({
  position: 'absolute',
  width: '100%',
  right: '2rem',
  height: '11rem',
  display: 'flex',
  justifyContent: 'flex-end',
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
  zIndex: themeVars.zIndex.content,
  color: themeVars.color.gray900,
});
