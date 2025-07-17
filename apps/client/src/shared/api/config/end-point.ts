export const END_POINT = {
  COMMUNITY: {
    POST_FEED: 'posts',
    POST_DETAIL_FEED: (postId: string) => `posts/${postId}`,
    PUT_FEED: 'posts',
    GET_FEED: 'posts',
    DELETE_FEED: 'posts',
    GET_COMMENTS: (postId?: string) => `posts/${postId}/comments`,
    POST_COMMENTS: (postId?: string) => `posts/${postId}/comments`,
    DELETE_COMMENTS: 'posts',
  },
  USER: {
    GET_USER_INFO: 'users/info',
    GET_USER_INFO_JOBS: 'user-infos/jobs',
    GET_ME_POSTS: 'users/me/posts',
    GET_ME_COMMENTS: 'users/me/comments',
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
    GET_SUSUL_REPORT: (id: string) => `insurances/reports/${id}/surgery`,
    GET_IPWON_REPORT: (id: string) =>
      `insurances/reports/${id}/hospitalization`,
    GET_JANGHAE_REPORT: (id: string) => `insurances/reports/${id}/disability`,
    GET_SAMANG_REPORT: (id: string) => `insurances/reports/${id}/death`,
  },
};
