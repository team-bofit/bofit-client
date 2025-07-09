import { tokenService } from '@shared/auth/services/token-service';
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
