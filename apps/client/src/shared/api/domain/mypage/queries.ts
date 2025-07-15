import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { UserProfile } from '@shared/api/types/types';
import { END_POINT } from '@shared/constants/end-point';
import { USER_QUERY_KEY } from '@shared/constants/query-key';

export const USER_QUERY_OPTIONS = {
  PROFILE: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    });
  },
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};
