export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
} as const;

export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
  REPORT_KEUNBYEONG: () => [...INSURANCE_QUERY_KEY.ALL, 'keunbyeong'],
} as const;
