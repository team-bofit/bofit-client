import { useQuery } from '@tanstack/react-query';

import Summarize from '@widgets/report/components/summarize/summarize';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
const TEST_REPORT_ID = '2281ccfc-1f10-4798-b3ad-6468b357b789';

const ReportPage = () => {
  const { data: reportData } = useQuery(
    INSURANCE_QUERY_OPTIONS.REPORT(TEST_REPORT_ID),
  );

  return (
    <>
      <Summarize
        reportInformation={reportData?.reportInformation}
        reportRationale={reportData?.reportRationale}
      />
    </>
  );
};

export default ReportPage;
