import { useMutation } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { FeedRequest, FeedResponse } from '@shared/api/types/types';
import { POSTS_QUERY_KEY } from '@shared/constants/query-key';
import { paths } from '@shared/types/schema';

export const postFeed = async (body: FeedRequest): Promise<FeedResponse> => {
  return api
    .post(END_POINT.COMMUNITY.POST_FEED, { json: body })
    .json<FeedResponse>();
};

export const usePostFeed = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: postFeed,
    onSuccess: () => {
      // @TODO 게시글 조회 쿼리키 초기화 로직 추가
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

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
    .get(`${END_POINT.COMMUNITY.POST_FEED}?size=15${cursorQuery}`)
    .json<communityListResponse>();
  return response.data;
};
