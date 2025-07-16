export const END_POINT = {
  COMMUNITY: {
    POST_FEED: 'posts',
    POST_DETAIL_FEED: (postId: number | string) => `posts/${postId}`,
  },
  USER: {
    GET_USER_INFO: 'users/info',
    GET_USER_INFO_JOBS: 'user-infos/jobs',
  },
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
  },
};
