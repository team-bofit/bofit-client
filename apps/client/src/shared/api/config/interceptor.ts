import { authService } from '@shared/auth/services/auth-service';
import { tokenService } from '@shared/auth/services/token-service';
import { appConfig } from '@shared/configs/app-config';
import { HTTP_STATUS_CODE } from '@shared/constants/api';
import { routePath } from '@shared/router/path';

import { HTTPError } from './http-error';
import { api } from './instance';

/** 토큰 재발급을 요청할 API 엔드포인트 URL */
const REFRESH_ENDPOINT = `${appConfig.api.baseUrl}/oauth/reissue`;

/**
 * ky 라이브러리의 beforeRequest 훅에서 호출할 함수입니다.
 *
 * 1. 로컬스토리지에서 accessToken을 가져옵니다.
 * 2. accessToken이 있으면 요청 헤더 Authorization에 'Bearer {token}' 형식으로 세팅합니다.
 */

export const handleCheckAndSetToken = (request: Request) => {
  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
};

/**
 * 인증 실패 시 호출하는 함수입니다.
 * - 로그아웃 처리 후 로그인 페이지로 리다이렉트합니다.
 * - 이후 요청을 중단시키기 위해 예외를 던집니다.
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
 * ky 라이브러리의 afterResponse 훅에서 호출되는 함수입니다.
 *
 * - 서버 응답이 401 Unauthorized인 경우 토큰 재발급을 시도합니다.
 * - 재발급 성공 시 새 accessToken으로 기존 요청을 재생성하여 다시 요청합니다.
 * - 재발급 실패 시 로그인 페이지로 리다이렉트합니다.
 * - 401이 아닌 경우 원래 응답을 그대로 반환합니다.
 *
 * @param {Response} response - 서버로부터 받은 응답 객체
 * @param {Request} request - 원래 요청 객체
 * @returns {Promise<Response>} 새로운 요청 또는 원래 응답을 반환합니다.
 */

export const handleUnauthorizedResponse = async (
  response: Response,
  request: Request,
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

    const newHeaders = new Headers(request.headers);
    newHeaders.set('Authorization', `Bearer ${newAccessToken}`);

    const newRequest = new Request(request, {
      headers: newHeaders,
    });

    return api(newRequest);
  } catch (e) {
    return redirectToLogin();
  }
};
