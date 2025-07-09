import ky from '@toss/ky';

import { appConfig } from '@shared/configs/app-config.ts';

import {
  handleCheckAndSetToken,
  handleUnauthorizedResponse,
} from './interceptor';

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
