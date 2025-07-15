import { useMutation } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { FeedRequest, FeedResponse } from '@shared/api/types/types';

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
