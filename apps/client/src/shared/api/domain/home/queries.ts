import { queryOptions } from '@tanstack/react-query';

import { END_POINT } from '@shared/api/config/end-point.ts';
import { api } from '@shared/api/config/instance';
import { HOME_QUERY_KEY, USER_QUERY_KEY } from '@shared/api/keys/query-key.ts';
import { ReportSummaryRes, UserProfile } from '@shared/api/types/types';

export const HOME_QUERY_OPTIONS = {
  REPORT_SUMMARY: () => {
    return queryOptions({
      queryKey: HOME_QUERY_KEY.REPORT_SUMMARY(),
      queryFn: getReportSummary,
      select: (data: ReportSummaryRes | null) => data?.data,
    });
  },
  USER_INFO: () => {
    return queryOptions({
      queryKey: USER_QUERY_KEY.PROFILE(),
      queryFn: getUserProfile,
      select: (data: UserProfile | null) => data?.data,
    });
  },
};

export const getReportSummary = async (): Promise<ReportSummaryRes | null> => {
  const response = await api
    .get(END_POINT.USER.GET_REPORT_SUMMARY)
    .json<ReportSummaryRes>();
  return response;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const response = await api
    .get(END_POINT.USER.GET_USER_INFO)
    .json<UserProfile>();
  return response;
};
