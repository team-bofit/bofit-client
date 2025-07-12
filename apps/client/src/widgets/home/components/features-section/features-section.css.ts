import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const featureSection = style({
  backgroundColor: themeVars.color.white,
  padding: '2.4rem 0 1.9rem 0',
  borderRadius: '24px 24px 0px 0px',
  // height: '100%',

  display: 'flex',
  flexDirection: 'column',
  gap: '2.8rem',
});

export const communityContainer = style({
  padding: '0 1.6rem',
});

export const sectionTitle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  marginBottom: '0.8rem',
});

export const title = style({
  ...themeVars.fontStyles.head_eb_18,
  color: themeVars.color.gray800,
});

export const insuranceContainer = style({
  padding: '0 0 0 1.6rem',
});

// @TODO 추후 swiper로 변경 예정
export const tipList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

export const indicatorContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.8rem',
});
