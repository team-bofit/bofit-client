import { style } from '@vanilla-extract/css';

export const allgraphContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',
});

export const graphContentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const graphContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const alertDiagnosisContainer = style({
  paddingBottom: '1.6rem',
});

export const alertInjuryContainer = style({
  paddingTop: '1.6rem',
});
