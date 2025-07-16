export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
} as const;

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  JOBS: () => [...USER_QUERY_KEY.ALL, 'jobs'],
  ME_POSTS: () => [...USER_QUERY_KEY.ALL, 'me-post'],
  ME_COMMENTS: () => [...USER_QUERY_KEY.ALL, 'me-comments'],
} as const;

export const COMMUNITY_QUERY_KEY = {
  ALL: ['community'],
};
