import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { USER_QUERY_KEY } from '@shared/constants/query-key';
import { paths } from '@shared/types/schema';

export const USER_QUERY_OPTIONS = {
  PROFILE: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    });
  },
};

type UserProfile =
  paths['/users/info']['get']['responses']['200']['content']['*/*'];

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api.get(END_POINT.GET_USER_INFO).json<UserProfile>();
  return response;
};
