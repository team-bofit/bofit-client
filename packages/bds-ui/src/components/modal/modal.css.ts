import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '30rem',
  borderRadius: '2rem',
  background: themeVars.color.whiteBackground,
});

export const modalContentContainer = style({
  display: 'flex',
  padding: '2rem 2.4rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1.6rem',
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
  ...themeVars.fontStyles.body1_m_14,
  color: themeVars.color.gray800,
  textAlign: 'center',
  width: '100%',
});
