import { routePath } from '@shared/router/path.ts';

/**
 * 애플리케이션 전체 설정을 관리하는 Config 파일
 */
const DEFAULT_CONFIG = {
  auth: {
    isEnabled: true, // 인증 기능 활성화 여부

    loginSuccessUrl: routePath.LOGIN_FALLBACK,
    loginFailureUrl: routePath.LOGIN,

    kakaoLoginUrl: import.meta.env.VITE_KAKAO_LOGIN_URL || '',
  },

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    kakaoRedirectUrl: import.meta.env.VITE_KAKAO_REDIRECT_URL,
  },
};

export const appConfig = {
  ...DEFAULT_CONFIG,
};
