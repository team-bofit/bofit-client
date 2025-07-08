/**
 * 토큰 관리를 위한 서비스
 */

const TOKEN_KEY_ACCESS = 'accessToken';
const TOKEN_KEY_REFRESH = 'refreshToken';

/**
 * 토큰 관련 기능을 제공하는 서비스 객체
 */
export const tokenService = {
  /**
   * 로컬 스토리지에 토큰을 저장합니다.
   */
  saveAccessToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(TOKEN_KEY_ACCESS, token);
  },

  saveRefreshToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(TOKEN_KEY_REFRESH, token);
  },

  /**
   * 로컬 스토리지에서 토큰을 가져옵니다.
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY_ACCESS);
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY_REFRESH);
  },

  /**
   * 로컬 스토리지에서 토큰을 제거합니다.
   */
  removeAccessToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(TOKEN_KEY_ACCESS);
  },

  removeRefreshToken(): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(TOKEN_KEY_REFRESH);
  },

  /**
   * 토큰이 존재하는지 확인합니다.
   */
  hasToken(): boolean {
    return (this.getAccessToken() && this.getRefreshToken()) !== null;
  },

  /**
   * Bearer 헤더 형식의 토큰을 추출합니다.
   */
  extractTokenFromBearer(bearerToken: string): string {
    if (bearerToken.startsWith('Bearer ')) {
      return bearerToken.slice('Bearer '.length);
    }
    return bearerToken;
  },
};
