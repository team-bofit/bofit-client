export const END_POINT = {
  COMMUNITY: {
    POST_FEED: 'posts',
    POST_DETAIL_FEED: (postId: string) => `posts/${postId}`,
    PUT_FEED: 'posts',
    GET_FEED: 'posts',
    GET_COMMENTS: (postId?: string) => `posts/${postId}/comments`,
  },
  USER: {
    GET_USER_INFO: 'users/info',
    GET_USER_INFO_JOBS: 'user-infos/jobs',
    GET_USER_INFO_DISEASES: 'user-infos/diagnosed-disease',
    GET_USER_INFO_COVERAGES: 'user-infos/coverage-select',
    GET_REPORT_SUMMARY: 'users/me/report-summary',
    POST_USER_INFO_SUBMIT: 'insurances/reports',
  },
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
    GET_REPORT_SUMMARY: 'users/me/report-summary',
    GET_KEUNBYEONG_REPORT: (id: string) =>
      `insurances/reports/${id}/major-disease`,
  },
};
