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
  zIndex: themeVars.zIndex.base,
});

export const sliderRange = style({
  position: 'absolute',
  top: '50%',
  height: '0.4rem',
  backgroundColor: themeVars.color.primary500,
  borderRadius: '2px',
  transform: 'translateY(-50%)',
  zIndex: themeVars.zIndex.content,
});

// input[type=range] 스타일 (숨겨진 thumb, 커스텀화)
export const thumb = style({
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  height: '0.4rem',
  zIndex: themeVars.zIndex.overlay,

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
  zIndex: themeVars.zIndex.overlay,
});

// sliderLabels 스타일
export const sliderLabels = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  top: '3.5rem',
});

export const sliderLabel = style({
  ...themeVars.fontStyles.body1_m_12,
  color: themeVars.color.gray600,
});
