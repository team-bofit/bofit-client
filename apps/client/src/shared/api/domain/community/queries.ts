import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import {
  COMMUNITY_QUERY_KEY,
  POST_FEED_DETAIL_KEY,
} from '@shared/api/keys/query-key';
import {
  CommentPostResponse,
  CommentResponse,
  FeedDetailResponse,
  FeedPreviewResponse,
  FeedRequest,
  FeedResponse,
  FeedUpdateRequestBody,
  FeedUpdateResponse,
} from '@shared/api/types/types';

export const POST_FEED_DETAIL_OPTIONS = {
  DETAIL: (postId: string) => {
    return queryOptions({
      queryKey: POST_FEED_DETAIL_KEY.DETAIL().concat(String(postId)),
      queryFn: () => getFeedDeatil(postId),
    });
  },
};

export const getFeedDeatil = async (
  postId: string,
): Promise<FeedDetailResponse | null> => {
  const response = await api
    .get(END_POINT.COMMUNITY.POST_DETAIL_FEED(postId))
    .json<FeedDetailResponse>();

  return response.data;
};

export const postComment = async (params: {
  postId: string;
  content: string;
}): Promise<CommentPostResponse> => {
  const { postId, content } = params;

  return api
    .post(END_POINT.COMMUNITY.POST_COMMENTS(postId), {
      json: { content },
    })
    .json<CommentPostResponse>();
};

export const POST_COMMENT = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...COMMUNITY_QUERY_KEY.COMMENTS(), variables.postId],
      });
      queryClient.invalidateQueries({
        queryKey: [...POST_FEED_DETAIL_KEY.DETAIL(), String(variables.postId)],
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
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

export const putFeed = async (
  postId: string,
  body: FeedUpdateRequestBody,
): Promise<FeedUpdateResponse> => {
  return api
    .put(`${END_POINT.COMMUNITY.PUT_FEED}/${postId}`, {
      json: body,
    })
    .json<FeedUpdateResponse>();
};

export const PUT_FEED = (onSuccessCallback?: () => void) => {
  const queyrClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      body,
    }: {
      postId: string;
      body: FeedUpdateRequestBody;
    }) => putFeed(postId, body),
    onSuccess: async (_data, variables) => {
      await queyrClient.invalidateQueries({
        queryKey: [...POST_FEED_DETAIL_KEY.DETAIL(), String(variables.postId)],
      });

      if (onSuccessCallback) {
        onSuccessCallback;
      }
    },
  });
};

export const POSTS_QUERY_OPTIONS = {
  POSTS: () => ({
    queryKey: POST_FEED_DETAIL_KEY.FEED(),
    queryFn: ({ pageParam = 0 }) =>
      getPosts({ pageParam: pageParam as number }),
    initialPageParam: 0,
  }),
};

export const getPosts = async ({
  pageParam,
}: { pageParam?: number } = {}): Promise<FeedPreviewResponse> => {
  const cursorQuery = pageParam ? `&cursor=${pageParam}` : '';
  const response = await api
    .get(`${END_POINT.COMMUNITY.GET_FEED}?size=15${cursorQuery}`)
    .json<FeedPreviewResponse>();
  return response.data;
};

export const COMMUNITY_QUERY_OPTIONS = {
  COMMENTS: (postId?: string) => ({
    queryKey: [...COMMUNITY_QUERY_KEY.COMMENTS(), postId],
    queryFn: ({ pageParam = 0 }) => getComments(postId, { pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: CommentResponse | null) =>
      lastPage?.data?.nextCursor ?? undefined,
  }),
};

export const getComments = async (
  postId?: string,
  { pageParam }: { pageParam?: number } = {},
): Promise<CommentResponse | null> => {
  const cursorQuery = pageParam ? `&cursor=${pageParam}` : '';
  const response = await api
    .get(`${END_POINT.COMMUNITY.GET_COMMENTS(postId)}?size=15${cursorQuery}`)
    .json<CommentResponse>();

  return response;
};
