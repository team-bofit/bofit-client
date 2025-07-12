// onboarding.css.ts

import { style } from '@vanilla-extract/css';

export const bottomContainer = style({
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  maxWidth: '43rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 1.6rem 2.4rem',
  gap: '1.6rem',
  backgroundColor: 'white', // 필수: iOS에서 버튼 아래 투명 방지
  zIndex: 10,
});

export const defaultButtonContainer = style({
  padding: '1.6rem',
});
