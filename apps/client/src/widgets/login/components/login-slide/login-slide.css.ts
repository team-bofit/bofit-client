import { style } from '@vanilla-extract/css';

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100svh',
});

export const slideImageSection = style({
  height: 'calc(100% - 17rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '6svh',
});

export const contentTextContainer = style({
  width: '100%',
  padding: '3.2rem 3.6rem 3.2rem 3.6rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '1.5rem',
  alignSelf: 'stretch',
});

export const contentHeader = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

export const bottomContainer = style({
  width: '100%',
  maxWidth: '43rem',
  padding: '2.4rem 1.6rem 2.4rem 1.6rem',
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3.2rem',
  alignSelf: 'stretch',
});

export const indicatorContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
});
