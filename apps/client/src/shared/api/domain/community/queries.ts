import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { POSTS_QUERY_KEY } from '@shared/constants/query-key';
import { paths } from '@shared/types/schema';

export const POSTS_QUERY_OPTIONS = {
  POSTS: () => ({
    queryKey: POSTS_QUERY_KEY.POSTS(),
    queryFn: ({ pageParam = 0 }) =>
      getPosts({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage: communityListResponse) => {
      if (lastPage?.isLast) {
        return undefined;
      }
      return lastPage?.nextCursor ?? undefined;
    },
    initialPageParam: 0,
  }),
};

export type communityListResponse =
  paths['/posts']['get']['responses']['200']['content']['*/*']['data'];

export const getPosts = async ({
  pageParam,
}: { pageParam?: number } = {}): Promise<communityListResponse> => {
  const cursorQuery = pageParam ? `&cursor=${pageParam}` : '';
  const response = await api
    .get(`${END_POINT.COMMUNITY.GET_POSTS_INFO}?size=15${cursorQuery}`)
    .json<communityListResponse>();
  return response.data;
};
