import { Navigate, Outlet } from 'react-router';

import { authService } from '@shared/auth/services/auth-service.ts';
import { tokenService } from '@shared/auth/services/token-service';

import { routePath } from '../path';

export function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();
  const isTermsChecked = tokenService.getIsTermsToken() === 'true';

  if (!isAuthenticated) {
    return <Navigate to={routePath.SPLASH} replace />;
  }
  if (isTermsChecked) {
    return <Navigate to={routePath.HOME} replace />;
  }

  return <Outlet />;
}
