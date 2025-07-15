export const END_POINT = {
  GET_USER_INFO: 'users/info',
  INSURANCE: {
    GET_REPORT: (id: string) => `insurances/reports/${id}`,
    GET_KEUNBYEONG_REPORT: (id: string) =>
      `insurances/reports/${id}/major-disease`,
  },
};
