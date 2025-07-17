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
} as const;

export const COMMUNITY_QUERY_KEY = {
  ALL: ['community'],
  FEED: () => [...COMMUNITY_QUERY_KEY.ALL, 'feed'],
  COMMENTS: () => [...COMMUNITY_QUERY_KEY.ALL, 'comment'],
};

export const HOME_QUERY_KEY = {
  ALL: ['home'],
  REPORT_SUMMARY: () => [...HOME_QUERY_KEY.ALL, 'report_summary'],
} as const;

export const POST_FEED_DETAIL_KEY = {
  ALL: ['details'],
  DETAIL: () => [...POST_FEED_DETAIL_KEY.ALL, 'detail'],
  FEED: () => [...POST_FEED_DETAIL_KEY.ALL, 'feed'],
};
