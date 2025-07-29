import { routePath } from '@shared/router/path';
/**
 * 애플리케이션 전체 설정을 관리하는 Config 파일
 */
const DEFAULT_CONFIG = {
  auth: {
    isEnabled: true, // 인증 기능 활성화 여부
    loginSuccessUrl: routePath.LOGIN_FALLBACK,
    loginFailureUrl: routePath.LOGIN,
    kakaoLoginUrl: import.meta.env.VITE_KAKAO_LOGIN_URL || '',
    kakaoLocalRedirectUrl: import.meta.env.VITE_KAKAO_LOCAL_REDIRECT_URI || '',
    kakaoProdRedirectUrl: import.meta.env.VITE_KAKAO_PROD_REDIRECT_URI || '',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
};

export const appConfig = {
  ...DEFAULT_CONFIG,
};
