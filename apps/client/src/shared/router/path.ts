export const routePath = {
  SPLASH: '/splash',
  COMMUNITY: '/community',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  MY: '/my',
  REPORT: '/report',
  LOGIN_FALLBACK: '/login-fallback',
  HOME: '/',
} as const;

export type Routes = (typeof routePath)[keyof typeof routePath];
