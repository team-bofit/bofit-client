import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const modalContainer = style({
  width: '30rem',
  background: themeVars.color.whiteBackground,
  borderRadius: '20px',
});

export const modalTitleContainer = style({
  width: ' 100%',
  height: '2.7rem',
  marginTop: '2rem',
});

export const modalContentContainer = style({
  width: '100%',
  minHeight: '2.7rem',
  height: '100%',
  padding: '2rem 2.4rem',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

export const modalTermsContainer = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray800,
  display: 'flex',
  width: '100%',
  padding: '0.8rem 0.4rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
});

export const modalActionContainer = style({
  display: 'flex',
  gap: '0.9rem',
  width: '100%',
  padding: '1.2rem',
  justifyContent: 'center',
});

export const modalTitle = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.gray900,
  textAlign: 'center',
  width: '100%',
});

export const modalContent = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray800,
  width: '100%',
  whiteSpace: 'pre-line',
});
export const modalHighlightContent = style({
  ...themeVars.fontStyles.head2_b_16,
  color: themeVars.color.gray900,
  width: '100%',
  whiteSpace: 'pre-line',
});
