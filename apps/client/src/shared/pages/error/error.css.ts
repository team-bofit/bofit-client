import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const errorContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  paddingBottom: '3.5rem',
});

export const errorImage = style({
  width: '100%',
  maxWidth: '27rem',
  marginRight: '1rem',
});

export const errorTitle = style({
  ...themeVars.fontStyles.head2_b_24,
  color: themeVars.color.primary500,
  marginTop: '3.6rem',
});

export const errorDescription = style({
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray700,
  whiteSpace: 'pre-wrap',
  marginTop: '2.4rem',
  textAlign: 'center',
});

export const errorButton = style({
  ...themeVars.fontStyles.head2_b_18,
  color: themeVars.color.primary500,
  border: `1px solid ${themeVars.color.primary500}`,
  width: '16.7rem',
  height: '5.6rem',
  borderRadius: '12px',
  marginTop: '4.0rem',
  selectors: {
    '&:active': {
      backgroundColor: themeVars.color.primary100,
    },
  },
});
