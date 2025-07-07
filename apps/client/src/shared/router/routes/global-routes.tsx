import CommunityPage from '@pages/community/community-page.tsx';
import LoginPage from '@pages/login/login-page.tsx';
import LoginFallbackPage from '@pages/login-fallback/login-fallback-page.tsx';
import MyPage from '@pages/my/my-page.tsx';
import OnboardingPage from '@pages/onboarding/onboarding-page.tsx';
import ReportPage from '@pages/report/report-page.tsx';
import SplashPage from '@pages/splash/splash-page.tsx';

import { HomePage } from '../lazy';
import { routePath } from '../path';
import { ProtectedRoute } from '@shared/auth/components';

// 공개 라우트 (인증 불필요)
const publicRoutes = [
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
const protectedRoutes = [
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

export const globalRoutes = [
  // 공개 라우트
  ...publicRoutes,
  // 인증이 필요한 라우트들을 ProtectedRoute로 감싸기
  {
    element: <ProtectedRoute />,
    children: protectedRoutes,
  },
];
