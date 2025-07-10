import { themeVars } from '@bds/ui/styles';
import { style } from '@vanilla-extract/css';

export const body = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const slideImageSection = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '25%', //
});

export const slideContentSection = style({
  width: '100%',
  display: 'flex',
  flex: 1,
  padding: '3.2rem 3.6rem 3.2rem 3.6rem', //
  flexDirection: 'column',
  zIndex: themeVars.zIndex.content,
});

export const Container = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const contentTextContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem', //
  alignSelf: 'stretch',
});

export const contentHeader = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem', //
});

export const bottomContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3.2rem',
  alignSelf: 'stretch',
});

export const indicatorContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
});
