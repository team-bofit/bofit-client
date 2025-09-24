import { style } from '@vanilla-extract/css';

export const etcInfoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1.6rem',
});

export const onboardingTitleContainer = style({
  margin: '2.7rem 0 4.8rem',
});

export const onboardingContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5.2rem',
  marginBottom: '9.6rem',
});

export const allStructureContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  marginTop: '1.2rem',
});

export const structureContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const buttonContainer = style({
  display: 'flex',
  gap: '0.8rem',
});

export const choiceQuestionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const nextButtonContainer = style({
  position: 'fixed',
  bottom: 0,
  maxWidth: '43rem',
  width: '100vw',
  padding: '0 1.6rem 2.4rem',
});
