import CommunityPage from '@pages/community/community-page';
import CommunityPostWrite from '@pages/community/community-post-write/community-post-write';
import CommunityWrite from '@pages/community/community-write/community-write';
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
    Component: LoginPage,
  },
  {
    path: routePath.LOGIN_FALLBACK,
    Component: LoginFallbackPage,
  },
  {
    path: routePath.SPLASH,
    Component: SplashPage,
  },
];

// 인증이 필요한 라우트
export const protectedRoutes = [
  {
    path: routePath.HOME,
    Component: HomePage,
  },
  {
    path: routePath.ONBOARDING,
    Component: OnboardingPage,
  },
  {
    path: routePath.COMMUNITY,
    Component: CommunityPage,
  },
  {
    path: routePath.COMMUNITY_WRITE,
    Component: CommunityWrite,
  },
  {
    path: routePath.MY,
    Component: MyPage,
  },
  {
    path: routePath.REPORT,
    Component: ReportPage,
  },
];
