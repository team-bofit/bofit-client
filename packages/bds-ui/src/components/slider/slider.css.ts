// slider.css.ts
import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const SliderContainer = style({
  position: 'relative',
  width: '100%',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const sliderTrack = style({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: '0.4rem',
  backgroundColor: themeVars.color.gray100,
  transform: 'translateY(-50%)',
  borderRadius: '2px',
  zIndex: 1,
});

export const sliderRange = style({
  position: 'absolute',
  top: '50%',
  height: '0.4rem',
  backgroundColor: themeVars.color.primary500,
  borderRadius: '2px',
  transform: 'translateY(-50%)',
  zIndex: 2,
});

// input[type=range] 스타일 (숨겨진 thumb, 커스텀화)
export const thumb = style({
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  height: '0.4rem',
  zIndex: 3,

  background: 'transparent',
  appearance: 'none',

  selectors: {
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      pointerEvents: 'auto',
      width: '2rem',
      height: '2rem',
      borderRadius: '20px',
      backgroundColor: themeVars.color.primary500,
      cursor: 'pointer',
    },
    '&::-moz-range-thumb': {
      pointerEvents: 'auto',
      width: '2rem',
      height: '2rem',
      borderRadius: '20px',
      backgroundColor: themeVars.color.primary500,
      cursor: 'pointer',
    },
  },
});

export const thumbMax = style({
  zIndex: 4, // 위에 오도록 설정
});
