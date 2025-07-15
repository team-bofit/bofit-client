import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point.ts';
import { api } from '@shared/api/config/instance';
import { USER_QUERY_KEY } from '@shared/api/keys/query-key.ts';
import { UserProfile } from '@shared/api/types/types';

export const HOME_QUERY_OPTIONS = {
  REPORT_SUMMARY: () => {
    return queryOptions({
      queryKey: HOME_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    });
  },
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api.get(END_POINT.GET_USER_INFO).json<UserProfile>();
  return response;
};
