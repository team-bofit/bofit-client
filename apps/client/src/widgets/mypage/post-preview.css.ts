import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '@bds/ui/styles';

export const container = style({
  width: '100%',
  display: 'flex',
  paddingBottom: '0.8rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
});

export const titleContentContainer = style({
  width: '100%',
  display: '-webkit-box',
  overflow: 'hidden',
  flexDirection: 'column',
  alignItems: 'flex-start',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  cursor: 'pointer',
});

export const contentContainer = style({
  marginTop: '1.2rem',
});

export const footerContainer = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: '0.8rem',
});

export const commentInfoContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const commentCountText = style({
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray600,
});

export const timeText = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray600,
});

export const contentText = styleVariants({
  medium: {
    ...themeVars.fontStyles.body1_m_12,
    color: themeVars.color.gray600,
  },
  large: { ...themeVars.fontStyles.body1_m_14, color: themeVars.color.gray600 },
});
