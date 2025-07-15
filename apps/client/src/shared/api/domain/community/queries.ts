import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { POSTS_QUERY_KEY } from '@shared/constants/query-key';
import { paths } from '@shared/types/schema';

export const POSTS_QUERY_OPTIONS = {
  POSTS: () => {
    return queryOptions({
      queryKey: POSTS_QUERY_KEY.POSTS(),
      queryFn: getPosts,
    });
  },
};

export type communityListResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*'];

export const getPosts = async (): Promise<communityListResponse | null> => {
  const response = await api
    .get(END_POINT.COMMUNITY.GET_POSTS_INFO)
    .json<communityListResponse>();
  return response;
};
