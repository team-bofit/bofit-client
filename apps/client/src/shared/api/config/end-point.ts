export const END_POINT = {
  COMMUNITY: {
    POST_FEED: 'posts',
    GET_FEED: 'posts',
  },
  USER: {
    GET_USER_INFO: 'users/info',
    GET_USER_INFO_JOBS: 'user-infos/jobs',
    GET_USER_INFO_DISEASES: 'user-infos/diagnosed-disease',
    GET_USER_INFO_COVERAGES: 'user-infos/coverage-select',
  },
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
  },
};
