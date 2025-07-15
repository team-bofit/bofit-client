export const END_POINT = {
  COMMUNITY: {
    POST_FEED: 'posts',
  },
  USER: {
    GET_USER_INFO: 'users/info',
  },
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
  },
};
