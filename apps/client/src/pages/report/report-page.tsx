import ReportDetail from '@widgets/report/components/report-detail/report-detail';
import Summarize from '@widgets/report/components/summarize/summarize';

import * as styles from './report-page.css';
const ReportPage = () => {
  return (
    <div className={styles.container}>
      <Summarize />
      <ReportDetail />
    </div>
  );
};

export default ReportPage;
