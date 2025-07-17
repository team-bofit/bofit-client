import CommunityEdit from '@pages/community/community-edit/community-edit';
import SplashPage from '@pages/splash/splash-page.tsx';

import {
  CommunityDetail,
  CommunityPage,
  CommunityWrite,
  HomePage,
  LoginFallbackPage,
  LoginPage,
  MyPage,
  OnboardingPage,
  ReportPage,
} from '../lazy';
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
    path: routePath.COMMUNITY_EDIT,
    Component: CommunityEdit,
  },
  {
    path: routePath.COMMUNITY_DETAIL,
    Component: CommunityDetail,
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
