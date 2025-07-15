import { queryOptions } from '@tanstack/react-query';

import { api } from '@shared/api/config/instance';
import { InsuranceKeunbyeongReport } from '@shared/api/types/types';
import { END_POINT } from '@shared/constants/end-point';
import { INSURANCE_QUERY_KEY } from '@shared/constants/query-key';

export const INSURANCE_QUERY_OPTION = {
  REPORT_KEUNBYEONG: (reportId: string, section: string) => {
    return queryOptions({
      queryKey: [INSURANCE_QUERY_KEY.REPORT_KEUNBYEONG(), reportId, section],
      queryFn: () => getInsuranceKeunbyeongReport(reportId, section),
    });
  },
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
