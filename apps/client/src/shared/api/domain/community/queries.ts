import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import {
  COMMUNITY_MUTATION_KEY,
  COMMUNITY_QUERY_KEY,
} from '@shared/api/keys/query-key';
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

// =============================================================================
// QUERY OPTIONS
// =============================================================================

export const COMMUNITY_QUERY_OPTIONS = {
  POSTS: () =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(),
      queryFn: ({ pageParam = 0 }) =>
        getAllFeed({ pageParam: pageParam as number }),
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

  FEED_DETAIL: (postId: string) => {
    return queryOptions({
      queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId).concat(),
      queryFn: () => getFeedDetail(postId),
    });
  },
};

// =============================================================================
// QUERY FUNCTIONS
// =============================================================================

/**
 * 모든 게시글을 페이지네이션으로 가져옵니다.
 * @param options - 페이지네이션 옵션
 * @param options.pageParam - 페이지 파라미터 (기본값: 0)
 * @returns 게시글 미리보기 응답 데이터
 */
export const getAllFeed = async ({
  pageParam,
}: { pageParam?: number } = {}): Promise<FeedPreviewResponse> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_FEED}?size=10`
      : `${END_POINT.COMMUNITY.GET_FEED}?cursor=${pageParam}&size=10`;

  const response = await api.get(url).json<FeedPreviewResponse>();

  return response.data;
};

/**
 * 특정 게시글의 모든 댓글을 페이지네이션으로 가져옵니다.
 * @param postId - 댓글을 가져올 게시글 ID
 * @param options - 페이지네이션 옵션
 * @param options.pageParam - 페이지 파라미터 (기본값: 0)
 * @returns 댓글 응답 데이터 또는 null
 */
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

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param postId - 상세 정보를 가져올 게시글 ID
 * @returns 게시글 상세 응답 데이터 또는 null
 */
export const getFeedDetail = async (
  postId: string,
): Promise<FeedDetailResponse | null> => {
  const response = await api
    .get(END_POINT.COMMUNITY.POST_DETAIL_FEED(postId))
    .json<FeedDetailResponse>();

  return response.data;
};

// =============================================================================
// MUTATION OPTIONS
// =============================================================================

export const COMMUNITY_MUTATION_OPTIONS = {
  POST_COMMENT: () => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.POST_COMMENT(),
      mutationFn: postComment,
    });
  },

  POST_FEED: () => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.POST_FEED(),
      mutationFn: postFeed,
    });
  },

  PUT_FEED: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.PUT_FEED(postId),
      mutationFn: ({ body }: { body: FeedUpdateRequestBody }) =>
        putFeed(postId, body),
    });
  },

  DELETE_FEED: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.DELETE_FEED(postId),
      mutationFn: () => deleteFeed(postId),
    });
  },

  DELETE_COMMENT: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.DELETE_COMMENT(postId),
      mutationFn: (commentId?: string) => deleteComment(postId, commentId),
    });
  },
};

// =============================================================================
// MUTATION FUNCTIONS
// =============================================================================

/**
 * 게시글에 댓글을 작성합니다.
 * @param params - 댓글 작성 파라미터
 * @param params.postId - 댓글을 작성할 게시글 ID
 * @param params.content - 댓글 내용
 * @returns 댓글 작성 응답 데이터
 */
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

/**
 * 새 게시글을 작성합니다.
 * @param body - 게시글 작성 요청 데이터
 * @returns 게시글 작성 응답 데이터
 */
export const postFeed = async (body: FeedRequest): Promise<FeedResponse> => {
  return api
    .post(END_POINT.COMMUNITY.POST_FEED, { json: body })
    .json<FeedResponse>();
};

/**
 * 기존 게시글을 수정합니다.
 * @param postId - 수정할 게시글 ID
 * @param body - 게시글 수정 요청 데이터
 * @returns 게시글 수정 응답 데이터
 */
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

/**
 * 게시글을 삭제합니다.
 * @param postId - 삭제할 게시글 ID
 * @returns 게시글 삭제 응답 데이터
 */
export const deleteFeed = async (
  postId: string,
): Promise<FeedDeleteResponse> => {
  const response = await api
    .delete(`${END_POINT.COMMUNITY.DELETE_FEED}/${postId}`)
    .json<FeedDeleteResponse>();
  return response;
};

/**
 * 댓글을 삭제합니다.
 * @param postId - 댓글이 속한 게시글 ID
 * @param commentId - 삭제할 댓글 ID
 * @returns 댓글 삭제 응답 데이터
 */
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
