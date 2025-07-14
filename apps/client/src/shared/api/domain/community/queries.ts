import { useMutation } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { paths } from '@shared/types/schema';

type FeedResponse = paths['/posts']['post']['responses']['200']['content'];
type FeedRequest = paths['/posts']['post']['requestBody']['content'];

export const postFeed = async (body: FeedRequest): Promise<FeedResponse> => {
  return api.post(END_POINT.POST_FEED, { json: body }).json<FeedResponse>();
};

export const usePostFeed = () => {
  return useMutation({
    mutationFn: postFeed,
  });
};
// @TODO 서버에게 스웨거 변경요청해야함 이거 get 요청임
