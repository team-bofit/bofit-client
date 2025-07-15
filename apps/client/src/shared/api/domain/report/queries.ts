import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { InsuranceReport } from '@shared/api/types/types';
import { END_POINT } from '@shared/constants/end-point';
import { INSURANCE_QUERY_KEY } from '@shared/constants/query-key';

export const INSURANCE_QUERY_OPTIONS = {
  REPORT: (reportId: string) => {
    return queryOptions({
      queryKey: [INSURANCE_QUERY_KEY.REPORT(), reportId],
      queryFn: () => getInsuranceReport(reportId),
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
