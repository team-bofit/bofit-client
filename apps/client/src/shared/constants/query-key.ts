export const POSTS_QUERY_KEY = {
  ALL: ['users'],
  POSTS: () => [...POSTS_QUERY_KEY.ALL, 'posts'],
} as const;
