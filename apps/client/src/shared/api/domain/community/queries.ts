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
  CommentReplyDeleteRequest,
  CommentReplyDeleteResponse,
  CommentReplyResponse,
  CommentResponse,
  FeedDeleteResponse,
  FeedDetailResponse,
  FeedPreviewResponse,
  FeedRequest,
  FeedResponse,
  FeedUpdateRequestBody,
  FeedUpdateResponse,
  LikeAddResponse,
  LikeDeleteResponse,
  PopularFeedResponse,
  SearchGetResponse,
} from '@shared/api/types/types';

// =============================================================================
// QUERY OPTIONS
// =============================================================================

export const COMMUNITY_QUERY_OPTIONS = {
  POSTS: (sort: string, category: string) =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(sort, category),
      queryFn: ({ pageParam = 0 }) =>
        getAllFeed({ pageParam: pageParam as number }, sort, category),
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

  COMMENT_REPLY: (postId: string, commentId: number) =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.COMMENTS_REPLY(postId, commentId),
      queryFn: ({ pageParam = 0 }) =>
        getCommentReply(postId, commentId, { pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage?.data?.nextCursor ? lastPage.data.nextCursor : undefined,
      initialPageParam: 0,
    }),

  POPULAR_FEED: (size?: number) => {
    return queryOptions({
      queryKey: COMMUNITY_QUERY_KEY.POPULAR_FEED(),
      queryFn: () => getPopularFeed(size),
    });
  },
  SEARCH: (keyword: string) =>
    infiniteQueryOptions({
      queryKey: COMMUNITY_QUERY_KEY.SEARCH(keyword),
      queryFn: ({ pageParam = 0 }) => getSearch(keyword, { pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage?.data?.isLast ? undefined : lastPage?.data?.nextCursor,
      initialPageParam: 0,
      enabled: keyword.trim().length > 0,
    }),
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
export const getAllFeed = async (
  { pageParam }: { pageParam?: number } = {},
  sort: string,
  category: string,
): Promise<FeedPreviewResponse> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_FEED}?sort=${sort}&category=${category}&size=10`
      : `${END_POINT.COMMUNITY.GET_FEED}?sort=${sort}&category=${category}&cursor=${pageParam}&size=10`;

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

/**
 *
 * @param postId - 댓글이 속한 게시글 ID
 * @param commentId - 댓글 ID
 * @param options - 페이지네이션 옵션
 * @param options.pageParam - 페이지 파라미터 (기본값: 0)
 * @returns 대댓글 응답 데이터 또는 null
 */

export const getCommentReply = async (
  postId: string,
  commentId: number,
  { pageParam }: { pageParam?: number } = {},
): Promise<CommentReplyResponse | null> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_COMMENT_REPLY(postId, commentId)}?size=10`
      : `${END_POINT.COMMUNITY.GET_COMMENT_REPLY(postId, commentId)}?cursor=${pageParam}&size=10`;
  const response = await api.get(url).json<CommentReplyResponse>();
  return response;
};

/**
 * 인기 게시글의 정보를 가져옵니다.
 * @param size - 게시글 검색 파라미터
 * @returns 게시글 상세 응답 데이터 또는 null
 */
export const getPopularFeed = async (
  size?: number,
  sort?: string,
): Promise<PopularFeedResponse | null> => {
  const response = await api
    .get(`${END_POINT.COMMUNITY.GET_POPULAR}?size=${size}&sort=${sort}`)
    .json<PopularFeedResponse>();
  return response;
};

/**
 * 검색 키워드를 기반으로 게시물을 검색합니다.
 * @param keyword - 게시글 검색 파라미터
 * @returns 게시글 상세 응답 데이터 또는 null
 */
export const getSearch = async (
  keyword: string,
  { pageParam = 0 }: { pageParam?: number } = {},
): Promise<SearchGetResponse | null> => {
  const url =
    pageParam === 0
      ? `${END_POINT.COMMUNITY.GET_SEARCH}?keyword=${keyword}&size=10`
      : `${END_POINT.COMMUNITY.GET_SEARCH}?keyword=${keyword}&cursor=${pageParam}&size=10`;
  const response = await api.get(url).json<SearchGetResponse>();

  return response;
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

  POST_FEED: (sort?: string, category?: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.POST_FEED(sort, category),
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
      mutationFn: (commentId?: number) => deleteComment(postId, commentId),
    });
  },

  DELETE_COMMENT_REPLY: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.DELETE_COMMENT_REPLY(postId),
      mutationFn: ({
        ['comment-id']: commentId,
        ['comment-reply-id']: commentReplyId,
      }: CommentReplyDeleteRequest) =>
        deleteCommentReply(postId, commentId, commentReplyId),
    });
  },

  ADD_LIKE: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.ADD_LIKE(postId),
      mutationFn: () => postLike(postId),
    });
  },

  DELETE_LIKE: (postId: string) => {
    return mutationOptions({
      mutationKey: COMMUNITY_MUTATION_KEY.DELETE_LIKE(postId),
      mutationFn: () => deleteLike(postId),
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
  commentId?: number,
): Promise<CommentDeleteResponse> => {
  const response = await api
    .delete(
      `${END_POINT.COMMUNITY.DELETE_COMMENTS}/${postId}/comments/${commentId}`,
    )
    .json<CommentDeleteResponse>();
  return response;
};

/**
 * 대댓글을 삭제합니다.
 * @param postId - 대댓글이 속한 게시글 ID
 * @param commentId - 대댓글이 속한 댓글 ID
 * @param commentReplyId - 삭제할 대댓글 ID
 * @returns 대댓글 삭제 응답 데이터
 */
export const deleteCommentReply = async (
  postId: string,
  commentId: number,
  commentReplyId: number,
): Promise<CommentReplyDeleteResponse> => {
  const response = await api
    .delete(
      `${END_POINT.COMMUNITY.DELETE_COMMENT_REPLY}/${postId}/comments/${commentId}/reply/${commentReplyId}`,
    )
    .json<CommentReplyDeleteResponse>();
  return response;
};

/**
 * 게시글에 좋아요를 추가합니다.
 * @param postId - 좋아요를 누를 게시글 ID
 * @returns 좋아요 생성 응답 데이터
 */
export const postLike = async (postId: string): Promise<LikeAddResponse> => {
  const response = await api
    .post(END_POINT.COMMUNITY.POST_LIKE(postId))
    .json<LikeAddResponse>();
  return response;
};

/**
 * 게시글의 좋아요를 취소합니다.
 * @param postId - 좋아요를 취소할 게시글 ID
 * @returns 좋아요 삭제 응답 데이터
 */
export const deleteLike = async (
  postId: string,
): Promise<LikeDeleteResponse> => {
  const response = await api
    .delete(END_POINT.COMMUNITY.DELETE_LIKE(postId))
    .json<LikeDeleteResponse>();
  return response;
};
