import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point.ts';
import { api } from '@shared/api/config/instance';
import { USER_QUERY_KEY } from '@shared/api/keys/query-key.ts';
import {
  KakaoLogoutResponse,
  KakaoWithdrawResponse,
  MePostResponse,
  UserProfile,
} from '@shared/api/types/types';

// =============================================================================
// QUERY OPTIONS
// =============================================================================

export const USER_QUERY_OPTIONS = {
  PROFILE: () =>
    queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    }),

  ME_POSTS: () =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.ME_POSTS(),
      queryFn: ({ pageParam = 0 }) => getMePosts({ pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? undefined : lastPage.nextCursor,
      initialPageParam: 0,
    }),

  ME_COMMENTS: () =>
    infiniteQueryOptions({
      queryKey: USER_QUERY_KEY.ME_COMMENTS(),
      queryFn: ({ pageParam = 0 }) => getMeComments({ pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? undefined : lastPage.nextCursor,
      initialPageParam: 0,
    }),
};

// =============================================================================
// QUERY FUNCTIONS
// =============================================================================

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};

export const getMePosts = async ({ pageParam }: { pageParam: number }) => {
  const url =
    pageParam === 0
      ? `${END_POINT.USER.GET_ME_POSTS}?size=10`
      : `${END_POINT.USER.GET_ME_POSTS}?cursorId=${pageParam}&size=10`;

  const response = await api.get(url).json<MePostResponse>();
  return response.data;
};

export const getMeComments = async ({ pageParam }: { pageParam: number }) => {
  const url =
    pageParam === 0
      ? `${END_POINT.USER.GET_ME_COMMENTS}?size=10`
      : `${END_POINT.USER.GET_ME_COMMENTS}?cursorId=${pageParam}&size=10`;

  const response = await api.get(url).json<MePostResponse>();
  return response.data;
};

// =============================================================================
// MUTATION OPTIONS
// =============================================================================

export const USER_MUTATION_OPTIONS = {
  KAKAO_LOGOUT: () => {
    return mutationOptions({
      mutationKey: USER_QUERY_KEY.KAKAO_LOGOUT(),
      mutationFn: kakaoLogout,
    });
  },

  KAKAO_WITHDRAW: () => {
    return mutationOptions({
      mutationKey: USER_QUERY_KEY.KAKAO_WITHDRAW(),
      mutationFn: kakaoWithdraw,
    });
  },
};

// =============================================================================
// MUTATION FUNCTIONS
// =============================================================================

export const kakaoLogout = async (redirectUrl: string) => {
  const response = await api
    .post(`${END_POINT.USER.KAKAO_LOGOUT}?redirect-url=${redirectUrl}`)
    .json<KakaoLogoutResponse>();
  return response;
};

export const kakaoWithdraw = async () => {
  const response = await api
    .delete(END_POINT.USER.KAKAO_WITHDRAW)
    .json<KakaoWithdrawResponse>();
  return response;
};
