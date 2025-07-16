export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
} as const;

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  JOBS: () => [...USER_QUERY_KEY.ALL, 'jobs'],
} as const;

export const POST_FEED_DETAIL_KEY = {
  ALL: ['details'],
  DETAIL: () => [...POST_FEED_DETAIL_KEY.ALL, 'detail'],
  FEED: () => [...POST_FEED_DETAIL_KEY.ALL, 'feed'],
};
