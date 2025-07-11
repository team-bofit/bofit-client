import ky from '@toss/ky';

import {
  handleCheckAndSetToken,
  handleUnauthorizedResponse,
} from '@shared/api/config/interceptor';
import { appConfig } from '@shared/configs/app-config.ts';

export const api = ky.create({
  prefixUrl: appConfig.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: { limit: 0 },
  hooks: {
    beforeRequest: [handleCheckAndSetToken],
    afterResponse: [handleUnauthorizedResponse],
  },
});
