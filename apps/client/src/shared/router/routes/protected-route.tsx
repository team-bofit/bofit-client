import { Navigate, Outlet } from 'react-router';

import { authService } from '@shared/auth/services/auth-service.ts';

import { routePath } from '../path';

export function ProtectedRoute() {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={routePath.SPLASH} replace />;
  }

  return <Outlet />;
}
