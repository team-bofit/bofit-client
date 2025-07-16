import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point';
import { api } from '@shared/api/config/instance';
import {
  INSURANCE_QUERY_KEY,
  USER_QUERY_KEY,
} from '@shared/api/keys/query-key';
import {
  InsuranceReport,
  InsuranceSummary,
  UserProfile,
} from '@shared/api/types/types';

export const INSURANCE_QUERY_OPTIONS = {
  REPORT: (reportId: string) => {
    return queryOptions({
      queryKey: [INSURANCE_QUERY_KEY.REPORT(), reportId],
      queryFn: () => getInsuranceReport(reportId),
      enabled: !!reportId,
    });
  },
  REPORT_SUMMARY: () => {
    return queryOptions({
      queryKey: [INSURANCE_QUERY_KEY.REPORT_SUMMARY()],
      queryFn: () => getInsuranceSummary(),
    });
  },
};

export const USER_QUERY_OPTIONS = {
  PROFILE: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
    });
  },
};

export const getInsuranceReport = async (
  reportId: string,
): Promise<InsuranceReport | null> => {
  const response = await api
    .get(END_POINT.INSURANCE.GET_REPORT(reportId))
    .json<InsuranceReport>();
  return response.data;
};

export const getInsuranceSummary =
  async (): Promise<InsuranceSummary | null> => {
    const response = await api
      .get(END_POINT.INSURANCE.GET_REPORT_SUMMARY)
      .json<InsuranceSummary>();
    return response.data;
  };

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};
