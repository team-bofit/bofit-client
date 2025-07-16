import { queryOptions, useMutation } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { POST_FEED_DETAIL_KEY } from '@shared/api/keys/query-key';
import {
  FeedDetailResponse,
  FeedRequest,
  FeedResponse,
} from '@shared/api/types/types';

export const POST_FEED_DETAIL_OPTIONS = {
  DETAIL: (postId: number | string) => {
    return queryOptions({
      queryKey: POST_FEED_DETAIL_KEY.DETAIL().concat(String(postId)),
      queryFn: () => getFeedDeatil(postId),
    });
  },
};

export const getFeedDeatil = async (
  postId: number | string,
): Promise<FeedDetailResponse | null> => {
  const response = await api
    .get(END_POINT.COMMUNITY.POST_DETAIL_FEED(postId))
    .json<FeedDetailResponse>();

  return response.data;
};

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
