import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import ReportDetail from '@widgets/report/components/report-detail/report-detail';
import Summarize from '@widgets/report/components/summarize/summarize';

import { routePath } from '@shared/router/path';

import * as styles from './report-page.css';

const HEADER_TEXT = '보험 추천 리포트';

const ReportPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <Navigation
        rightIcon={
          <Icon
            name="home"
            color="gray800"
            onClick={() => handleNavigate(routePath.HOME)}
          />
        }
        title={HEADER_TEXT}
      />
      <Summarize />
      <ReportDetail />
    </div>
  );
};

export default ReportPage;
