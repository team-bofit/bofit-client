import { Navigate, Outlet, useLocation } from 'react-router';

import { authService } from '@shared/auth/services/auth-service.ts';
import { tokenService } from '@shared/auth/services/token-service';

import { routePath } from '../path';

export function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();
  const isTermsChecked = tokenService.getIsTermsToken() === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={routePath.SPLASH} replace />;
  }
  const isOnOnboardingPage = location.pathname === routePath.ONBOARDING;

  if (isTermsChecked && isOnOnboardingPage) {
    return <Navigate to={routePath.HOME} replace />;
  }

  return <Outlet />;
}
