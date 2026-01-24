export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
  SUBMIT: () => [...INSURANCE_QUERY_KEY.ALL, 'submit'],
  REPORT_SUMMARY: () => [...INSURANCE_QUERY_KEY.ALL, 'report_summary'],
  REPORT_SECION: (reportId: string, section: string) => [
    ...INSURANCE_QUERY_KEY.ALL,
    reportId,
    section,
  ],
} as const;

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  JOBS: () => [...USER_QUERY_KEY.ALL, 'jobs'],
  ME_POSTS: () => [...USER_QUERY_KEY.ALL, 'me-post'],
  ME_COMMENTS: () => [...USER_QUERY_KEY.ALL, 'me-comments'],
  DISEASES: () => [...USER_QUERY_KEY.ALL, 'diseases'],
  COVERAGES: () => [...USER_QUERY_KEY.ALL, 'coverages'],
  OPTIONS: () => [...USER_QUERY_KEY.ALL, 'options'],
  KAKAO_LOGOUT: () => [...USER_QUERY_KEY.ALL, 'kakao-logout'],
  KAKAO_WITHDRAW: () => [...USER_QUERY_KEY.ALL, 'kakao-withdraw'],
} as const;

export const USER_MUTATION_KEY = {
  ALL: ['users'],
  USER_PROFILE: () => [...USER_MUTATION_KEY.ALL, 'user-profile'],
};

export const COMMUNITY_QUERY_KEY = {
  ALL: ['community'],
  FEED_PREVIEW: (sort?: string, category?: string) => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'feed',
    sort,
    category,
  ],
  FEED_DETAIL: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'detail',
    postId,
  ],
  COMMENTS: (postId?: string) => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'comment',
    postId,
  ],
  COMMENTS_REPLY: (postId: string, commentId: number) => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'comment',
    postId,
    'reply',
    commentId,
  ],
  POPULAR_FEED: () => [...COMMUNITY_QUERY_KEY.ALL, 'popular'],
  SEARCH: (keyword: string) => [...COMMUNITY_QUERY_KEY.ALL, 'search', keyword],
} as const;

export const COMMUNITY_MUTATION_KEY = {
  POST_COMMENT: () => [...COMMUNITY_QUERY_KEY.COMMENTS(), 'create'],
  POST_FEED: (sort?: string, category?: string) => [
    ...COMMUNITY_QUERY_KEY.FEED_PREVIEW(sort, category),
    'create',
  ],
  PUT_FEED: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
    'update',
  ],
  DELETE_FEED: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
    'delete',
  ],
  DELETE_COMMENT: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.COMMENTS(postId),
    'delete',
  ],
  PATCH_COMMENT: () => [...COMMUNITY_QUERY_KEY.ALL, 'comment', 'update'],
  POST_COMMENT_REPLY: () => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'comment',
    'reply',
    'create',
  ],
  PATCH_COMMENT_REPLY: () => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'comment',
    'reply',
    'update',
  ],
  DELETE_COMMENT_REPLY: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.ALL,
    'comment',
    postId,
    'reply',
    'delete',
  ],
  ADD_LIKE: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
    'add',
  ],
  DELETE_LIKE: (postId: string) => [
    ...COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
    'delete',
  ],
} as const;

export const HOME_QUERY_KEY = {
  ALL: ['home'],
  REPORT_SUMMARY: () => [...HOME_QUERY_KEY.ALL, 'report_summary'],
} as const;

export const AUTH_MUTATION_KEY = {
  ALL: ['auth'],
  KAKAO_LOGOUT: () => [...AUTH_MUTATION_KEY.ALL, 'kakao-logout'],
  KAKAO_WITHDRAW: () => [...AUTH_MUTATION_KEY.ALL, 'kakao-withdraw'],
} as const;

export const SHARED_MUTATION_KEY = {
  ALL: ['shared'],
  IMAGE_UPLOAD: () => [...SHARED_MUTATION_KEY.ALL, 'image-upload'],
};
