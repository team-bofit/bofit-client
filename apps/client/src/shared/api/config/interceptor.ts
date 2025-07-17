import { api } from '@shared/api/config/instance';
import { authService } from '@shared/auth/services/auth-service';
import { tokenService } from '@shared/auth/services/token-service';
import { appConfig } from '@shared/configs/app-config';
import { HTTP_STATUS_CODE } from '@shared/constants/api';
import { routePath } from '@shared/router/path';

/**
 * 토큰 재발급을 위한 API 엔드포인트 URL입니다.
 */
const REFRESH_ENDPOINT = `${appConfig.api.baseUrl}/oauth/reissue`;

/**
 * 요청 전에 accessToken을 Authorization 헤더에 설정합니다.
 *
 * @param request - 전송할 요청 객체
 */
export const handleCheckAndSetToken = (request: Request): void => {
  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
};

/**
 * 인증 실패 시 로그아웃 처리 후 로그인 페이지로 리다이렉트합니다.
 *
 * - 저장된 인증 정보를 제거합니다.
 * - '/login' 페이지로 강제 이동합니다.
 */
const redirectToLogin = (): void => {
  authService.logout();
  window.location.replace(routePath.LOGIN);
};

/**
 * 인증 실패(401 Unauthorized) 응답 시 토큰 재발급을 시도합니다.
 *
 * 동작 방식:
 * - 응답이 401이 아닌 경우 → 원래 응답을 그대로 반환합니다.
 * - 401이면서 refreshToken이 없는 경우 → 로그인 페이지로 리다이렉트합니다.
 * - refreshToken이 존재하는 경우:
 *   - 재발급 API에 요청을 보냅니다.
 *   - 성공 시 새 토큰을 저장하고 원래 요청을 재시도합니다.
 *   - 실패 시 로그인 페이지로 이동합니다.
 *
 * @param request - 실패했던 원래 요청 객체
 * @param options - 요청에 사용된 fetch 옵션
 * @param response - 서버로부터 받은 응답 객체
 *
 * @returns 새로 갱신된 토큰으로 재시도한 응답 또는 리다이렉트 후 중단
 *
 * @throws 인증 실패 또는 네트워크 오류 등으로 리다이렉트가 발생한 경우 예외를 던집니다.
 */
export const handleUnauthorizedResponse = async (
  request: Request,
  options: RequestInit,
  response: Response,
): Promise<Response> => {
  if (response.status !== HTTP_STATUS_CODE.UNAUTHORIZED) {
    return response;
  }

  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) {
    redirectToLogin();
    return Promise.reject();
  }

  try {
    const refreshResponse = await fetch(REFRESH_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!refreshResponse.ok) {
      redirectToLogin();
      return Promise.reject();
    }

    const { data } = await refreshResponse.json();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

    tokenService.saveAccessToken(newAccessToken);
    tokenService.saveRefreshToken(newRefreshToken);

    return api(request, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  } catch (error) {
    redirectToLogin();
    return Promise.reject();
  }
};
