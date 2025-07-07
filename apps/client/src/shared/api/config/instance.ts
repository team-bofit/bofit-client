import ky from '@toss/ky';

import { authService } from '@shared/auth/services/auth-service.ts';
import { tokenService } from '@shared/auth/services/token-service.ts';
import { appConfig } from '@shared/configs/app-config.ts';

export const api = ky.create({
  prefixUrl: appConfig.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: { limit: 0 },
  hooks: {
    beforeRequest: [
      (request: Request) => {
        const token = tokenService.getToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (response: Response) => {
        if (response.status === 401) {
          authService.logout();
        }
        /**
         * @TODO 추후 리프레시 토큰 추가 함수 구현
         */
      },
    ],
  },
});
