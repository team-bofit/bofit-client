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
  InsuranceKeunbyeongReport,
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
  REPORT_KEUNBYEONG: (reportId: string, section: string) => {
    return queryOptions({
      queryKey: INSURANCE_QUERY_KEY.REPORT_KEUNBYEONG(reportId, section),
      queryFn: () => getInsuranceKeunbyeongReport(reportId, section),
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

export const getInsuranceKeunbyeongReport = async (
  reportId: string,
  section: string,
): Promise<InsuranceKeunbyeongReport | null> => {
  const response = await api
    .get(END_POINT.INSURANCE.GET_KEUNBYEONG_REPORT(reportId), {
      searchParams: { section },
    })
    .json<InsuranceKeunbyeongReport>();
  return response;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};
