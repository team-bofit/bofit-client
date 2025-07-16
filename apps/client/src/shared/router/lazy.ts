import { lazy } from 'react';

export const HomePage = lazy(() => import('@pages/home/home-page'));

export const OnboardingPage = lazy(
  () => import('@pages/onboarding/onboarding-page'),
);

export const CommunityPage = lazy(
  () => import('@pages/community/community-page'),
);
export const CommunityWrite = lazy(
  () => import('@pages/community/community-write/community-write'),
);
export const CommunityDetail = lazy(
  () => import('@pages/community/community-detail/community-detail'),
);

export const MyPage = lazy(() => import('@pages/my/my-page'));

export const ReportPage = lazy(() => import('@pages/report/report-page'));

export const LoginPage = lazy(() => import('@pages/login/login-page'));
export const LoginFallbackPage = lazy(
  () => import('@pages/login-fallback/login-fallback-page'),
);
