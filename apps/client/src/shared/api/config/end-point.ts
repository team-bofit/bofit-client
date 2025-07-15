export const END_POINT = {
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
  },
  USER: {
    GET_USER_INFO: 'users/info',
    GET_USER_INFO_JOBS: 'user-infos/jobs',
  },
};
