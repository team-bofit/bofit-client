import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { END_POINT } from '@shared/constants/end-point';
import { INSURANCE_QUERY_KEY } from '@shared/constants/query-key';
import { paths } from '@shared/types/schema';

export const INSURANCE_QUERY_OPTIONS = {
  REPORT: (reportId: string) => {
    return queryOptions({
      queryKey: [INSURANCE_QUERY_KEY.REPORT(), reportId],
      queryFn: () => getInsuranceReport(reportId),
    });
  },
};

export type InsuranceReport =
  paths['/insurances/reports/{insurance-report-id}']['get']['responses']['200']['content']['*/*']['data'];

export const getInsuranceReport = async (
  reportId: string,
): Promise<InsuranceReport | null> => {
  const response = await api
    .get(END_POINT.GET_INSURANCE_REPORT(reportId))
    .json<InsuranceReport>();
  return response.data;
};
