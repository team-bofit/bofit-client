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
  FEED_PREVIEW: () => [...COMMUNITY_QUERY_KEY.ALL, 'feed'],
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
};

export const HOME_QUERY_KEY = {
  ALL: ['home'],
  REPORT_SUMMARY: () => [...HOME_QUERY_KEY.ALL, 'report_summary'],
} as const;
