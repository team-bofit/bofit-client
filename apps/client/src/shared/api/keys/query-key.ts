export const INSURANCE_QUERY_KEY = {
  ALL: ['insurances'],
  REPORT: () => [...INSURANCE_QUERY_KEY.ALL, 'report'],
  REPORT_KEUNBYEONG: (reportId: string, section: string) => [
    ...INSURANCE_QUERY_KEY.ALL,
    reportId,
    section,
  ],
} as const;

export const USER_QUERY_KEY = {
  ALL: ['users'],
  PROFILE: () => [...USER_QUERY_KEY.ALL, 'profile'],
  JOBS: () => [...USER_QUERY_KEY.ALL, 'jobs'],
} as const;
