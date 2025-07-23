import {
  infiniteQueryOptions,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import {
  CommentDeleteResponse,
  CommentPostResponse,
  CommentResponse,
  FeedDeleteResponse,
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
      queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId).concat(),
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
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(variables.postId),
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
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(variables.postId),
      });

      if (onSuccessCallback) {
        onSuccessCallback;
      }
    },
  });
};

export const COMMUNITY_QUERY_OPTIONS = {
  POSTS: () =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(),
      queryFn: ({ pageParam = 0 }) =>
        getAllPosts({ pageParam: pageParam as number }),
      getNextPageParam: (lastPage) =>
        lastPage?.isLast ? undefined : lastPage?.nextCursor,
      initialPageParam: 0,
    }),

  COMMENTS: (postId?: string) =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.COMMENTS(postId),
      queryFn: ({ pageParam = 0 }) => getAllComments(postId, { pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage?.data?.nextCursor ? lastPage.data.nextCursor : undefined,
      initialPageParam: 0,
    }),
};

export const getAllPosts = async ({
  pageParam,
}: { pageParam?: number } = {}): Promise<FeedPreviewResponse> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_FEED}?size=10`
      : `${END_POINT.COMMUNITY.GET_FEED}?cursor=${pageParam}&size=10`;

  const response = await api.get(url).json<FeedPreviewResponse>();

  return response.data;
};

export const getAllComments = async (
  postId?: string,
  { pageParam }: { pageParam?: number } = {},
): Promise<CommentResponse | null> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_COMMENTS(postId)}?size=10`
      : `${END_POINT.COMMUNITY.GET_COMMENTS(postId)}?cursor=${pageParam}&size=10`;

  const response = await api.get(url).json<CommentResponse>();

  return response;
};

export const deleteFeed = async (
  postId?: string,
): Promise<FeedDeleteResponse> => {
  const response = await api
    .delete(`${END_POINT.COMMUNITY.DELETE_FEED}/${postId}`)
    .json<FeedDeleteResponse>();
  return response;
};

export const useDeleteFeed = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deleteFeed(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['feeds'] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const deleteComment = async (
  postId?: string,
  commentId?: string,
): Promise<CommentDeleteResponse> => {
  const response = await api
    .delete(
      `${END_POINT.COMMUNITY.DELETE_COMMENTS}/${postId}/comments/${commentId}`,
    )
    .json<CommentDeleteResponse>();
  return response;
};

export const useDeleteComment = (
  postId: string,
  onSuccessCallback?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId?: string) => deleteComment(postId, commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(postId),
      });
      await queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
