import { HTTPError } from '@shared/api/config/http-error';
import { api } from '@shared/api/config/instance';
import { authService } from '@shared/auth/services/auth-service';
import { tokenService } from '@shared/auth/services/token-service';
import { appConfig } from '@shared/configs/app-config';
import { HTTP_STATUS_CODE } from '@shared/constants/api';
import { routePath } from '@shared/router/path';

/**
 * 토큰 재발급을 위한 API 엔드포인트 URL
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
 * 인증 실패 시 호출되는 함수입니다.
 *
 * - 로그아웃 처리를 수행하고,
 * - 로그인 페이지로 강제 리다이렉트합니다.
 * - 이후 흐름 중단을 위해 커스텀 HTTPError를 던집니다.
 *
 * @throws {HTTPError} 인증 실패 에러
 */
const redirectToLogin = () => {
  authService.logout();
  window.location.replace(routePath.LOGIN);
  throw new HTTPError(
    HTTP_STATUS_CODE.UNAUTHORIZED,
    '인증에 실패했습니다. 다시 로그인해주세요.',
  );
};

/**
 * 인증 실패(401 Unauthorized) 응답 시 토큰 재발급을 시도합니다.
 *
 * 동작 방식:
 * 1. 응답이 401이 아닌 경우 → 원래 응답을 그대로 반환합니다.
 * 2. 401이고 refreshToken이 없는 경우 → 로그인 페이지로 리다이렉트합니다.
 * 3. refreshToken이 있는 경우 → 재발급 API 요청을 보냅니다.
 *    - 성공 시 토큰을 저장하고, 원래 요청을 재시도합니다.
 *    - 실패 시 로그인 페이지로 리다이렉트합니다.
 *
 * @param request - 원래의 요청 객체
 * @param options - 요청에 사용된 옵션
 * @param response - 서버로부터 받은 응답 객체
 * @returns 새로운 요청 결과 또는 원래 응답
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
    return redirectToLogin();
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
      return redirectToLogin();
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
    return redirectToLogin();
  }
};
