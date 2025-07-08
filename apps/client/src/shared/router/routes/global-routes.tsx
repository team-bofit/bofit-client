import CommunityPage from '@pages/community/community-page.tsx';
import LoginPage from '@pages/login/login-page.tsx';
import LoginFallbackPage from '@pages/login-fallback/login-fallback-page.tsx';
import MyPage from '@pages/my/my-page.tsx';
import OnboardingPage from '@pages/onboarding/onboarding-page.tsx';
import ReportPage from '@pages/report/report-page.tsx';
import SplashPage from '@pages/splash/splash-page.tsx';

import { HomePage } from '../lazy';
import { routePath } from '../path';

// 공개 라우트 (인증 불필요)
export const publicRoutes = [
  {
    path: routePath.LOGIN,
    element: <LoginPage />,
  },
  {
    path: routePath.LOGIN_FALLBACK,
    element: <LoginFallbackPage />,
  },
  {
    path: routePath.SPLASH,
    element: <SplashPage />,
  },
];

// 인증이 필요한 라우트
export const protectedRoutes = [
  {
    path: routePath.HOME,
    element: <HomePage />,
  },
  {
    path: routePath.ONBOARDING,
    element: <OnboardingPage />,
  },
  {
    path: routePath.COMMUNITY,
    element: <CommunityPage />,
    children: [
      // @TODO 커뮤니티 관련 하위 라우트 작성
    ],
  },
  {
    path: routePath.MY,
    element: <MyPage />,
  },
  {
    path: routePath.REPORT,
    element: <ReportPage />,
  },
];
