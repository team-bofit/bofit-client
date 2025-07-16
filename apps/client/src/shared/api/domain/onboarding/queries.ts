import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { USER_QUERY_KEY } from '@shared/api/keys/query-key';
import { UserInfoJobs } from '@shared/api/types/types';

export const USER_QUERY_OPTIONS = {
  JOBS: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.JOBS(),
      queryFn: getUserInfoJobs,
    });
  },
};

export const getUserInfoJobs = async (): Promise<UserInfoJobs | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO_JOBS)
    .json<UserInfoJobs>();
  return response;
};
