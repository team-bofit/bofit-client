import { mutationOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point.ts';
import { api } from '@shared/api/config/instance';
import { AUTH_MUTATION_KEY } from '@shared/api/keys/query-key.ts';
import {
  KakaoLogoutResponse,
  KakaoWithdrawResponse,
} from '@shared/api/types/types';

// =============================================================================
// MUTATION OPTIONS
// =============================================================================

export const AUTH_MUTATION_OPTIONS = {
  KAKAO_LOGOUT: () => {
    return mutationOptions({
      mutationKey: AUTH_MUTATION_KEY.KAKAO_LOGOUT(),
      mutationFn: kakaoLogout,
    });
  },

  KAKAO_WITHDRAW: () => {
    return mutationOptions({
      mutationKey: AUTH_MUTATION_KEY.KAKAO_WITHDRAW(),
      mutationFn: kakaoWithdraw,
    });
  },
};

// =============================================================================
// MUTATION FUNCTIONS
// =============================================================================

export const kakaoLogout = async (redirectUrl: string) => {
  const response = await api
    .post(`${END_POINT.AUTH.KAKAO_LOGOUT}?redirect-url=${redirectUrl}`)
    .json<KakaoLogoutResponse>();
  return response;
};

export const kakaoWithdraw = async () => {
  const response = await api
    .delete(END_POINT.AUTH.KAKAO_WITHDRAW)
    .json<KakaoWithdrawResponse>();
  return response;
};
