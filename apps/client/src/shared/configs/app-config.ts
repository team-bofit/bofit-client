/**
 * 애플리케이션 전체 설정을 관리하는 Config 파일
 */
const DEFAULT_CONFIG = {
  // 인증 관련 설정
  auth: {
    isEnabled: true,

    loginSuccessUrl: '',
    loginFailureUrl: '',
  },

  api: {
    baseUrl: ``,
  },
};

/**
 * 애플리케이션 설정
 *
 * 실행 시 커스터마이징이 필요한 경우 이 객체를 직접 수정할 수 있습니다.
 */
export const appConfig = {
  ...DEFAULT_CONFIG,
};
