import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import ReportDetail from '@widgets/report/components/report-detail/report-detail';
import Summarize from '@widgets/report/components/summarize/summarize';

import {
  INSURANCE_QUERY_OPTIONS,
  USER_QUERY_OPTIONS,
} from '@shared/api/domain/report/queries';
import { routePath } from '@shared/router/path';

import * as styles from './report-page.css';

const HEADER_TEXT = '보험 추천 리포트';

const ReportPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const { data: reportSummaryData } = useQuery(
    INSURANCE_QUERY_OPTIONS.REPORT_SUMMARY(),
  );

  const REPORT_ID = reportSummaryData?.insuranceReportId ?? '';

  const { data: reportData } = useQuery(
    INSURANCE_QUERY_OPTIONS.REPORT(REPORT_ID),
  );

  const { data: userData } = useQuery(USER_QUERY_OPTIONS.PROFILE());

  return (
    <div className={styles.container}>
      <Navigation
        backgroundColor="white"
        rightIcon={
          <Icon
            name="home"
            color="gray800"
            onClick={() => handleNavigate(routePath.HOME)}
          />
        }
        title={HEADER_TEXT}
      />
      <Summarize
        nickname={userData?.data?.nickname}
        reportInformation={reportData?.data?.reportInformation}
        reportRationale={reportData?.data?.reportRationale}
      />
      <ReportDetail reportDetailData={reportData?.data} />
    </div>
  );
};

export default ReportPage;
