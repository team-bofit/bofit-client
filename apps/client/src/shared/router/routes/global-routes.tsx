import CommunityPage from '@pages/community/community-page.tsx';
import LoginPage from '@pages/login/login-page.tsx';
import LoginFallbackPage from '@pages/login-fallback/login-fallback-page.tsx';
import MyPage from '@pages/my/my-page.tsx';
import OnboardingPage from '@pages/onboarding/onboarding-page.tsx';
import ReportPage from '@pages/report/report-page.tsx';
import SplashPage from '@pages/splash/splash-page.tsx';

import { HomePage } from '../lazy';
import { routePath } from '../path';

export const globalRoutes = [
  {
    path: routePath.HOME,
    element: <HomePage />,
  },
  {
    path: routePath.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routePath.LOGIN_FALLBACK,
    element: <LoginFallbackPage />,
  },
  {
    path: routePath.ONBOARDING,
    element: <OnboardingPage />,
  },
  {
    path: routePath.COMMUNITY,
    element: <CommunityPage />,
  },
  {
    path: routePath.MY,
    element: <MyPage />,
  },
  {
    path: routePath.REPORT,
    element: <ReportPage />,
  },
  {
    path: routePath.SPLASH,
    element: <SplashPage />,
  },
];
