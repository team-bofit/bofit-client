/**
 * 인증 관련 기능을 제공하는 서비스
 */

import { appConfig } from '@shared/configs/app-config.ts';
import { routePath } from '@shared/router/path.ts';

import { tokenService } from './token-service.ts';

/**
 * 인증 관련 기능을 제공하는 서비스 객체
 */
export const authService = {
  /**
   * 사용자가 로그인되어 있는지 확인합니다.
   */
  isAuthenticated(): boolean {
    if (!appConfig.auth.isEnabled) {
      return true; // 인증 기능이 비활성화된 경우 인증된 것으로 간주
    }

    return tokenService.hasToken();
  },

  /**
   * 로그인 페이지로 리다이렉트합니다.
   */
  redirectToLogin(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.location.href = routePath.LOGIN;
  },

  /**
   * 로그아웃 처리를 합니다.
   */
  logout(): void {
    tokenService.removeToken();
    window.location.href = appConfig.auth.loginFailureUrl || '/';
  },
};
