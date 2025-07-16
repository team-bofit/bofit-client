export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
  REPORT_SUMMARY: () => [...INSURANCE_QUERY_KEY.ALL, 'report_summary'],
} as const;

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  JOBS: () => [...USER_QUERY_KEY.ALL, 'jobs'],
  DISEASES: () => [...USER_QUERY_KEY.ALL, 'diseases'],
  COVERAGES: () => [...USER_QUERY_KEY.ALL, 'coverages'],
} as const;

export const COMMUNITY_QUERY_KEY = {
  ALL: ['community'],
  FEED: () => [...COMMUNITY_QUERY_KEY.ALL, 'feed'],
};
