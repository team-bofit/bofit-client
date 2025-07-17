import { useNavigate } from 'react-router';

import { Button, Tab } from '@bds/ui';

import { useMoveScroll } from '@widgets/report/hooks/use-move-scroll';

import { InsuranceReport } from '@shared/api/types/types';
import { routePath } from '@shared/router/path';

import Ipwon from '../ipwon/ipwon';
import Janghae from '../janghae/janghae';
import Keunbyeong from '../keunbyeong/keunbyeong';
import Samang from '../samang/samang';
import Susul from '../susul/susul';

import * as styles from './report-detail.css';

const SECTIONS = [
  { key: 'majorDisease', title: '큰 병', Component: Keunbyeong },
  { key: 'surgery', title: '수술', Component: Susul },
  { key: 'hospitalization', title: '입원', Component: Ipwon },
  { key: 'disability', title: '장해', Component: Janghae },
  { key: 'death', title: '사망', Component: Samang },
] as const;

const TEXT = {
  BUTTON_TEXT: '더 자세한 보장 알아보기',
  SUB_TEXT: '이 보험에 관심이 있다면',
  HOME_TEXT: '홈으로',
};

interface ReportDetailProps {
  reportDetailData?: InsuranceReport['data'];
  reportId: string;
}
const ReportDetail = ({ reportDetailData, reportId }: ReportDetailProps) => {
  const navigate = useNavigate();

  const scrollRefs = {
    majorDisease: useMoveScroll(),
    surgery: useMoveScroll(),
    hospitalization: useMoveScroll(),
    disability: useMoveScroll(),
    death: useMoveScroll(),
  };

  const handleClick = () => {
    navigate(routePath.HOME);
  };

  return (
    <div>
      <div className={styles.tabStickyContainer}>
        <Tab.Container initialValue="큰 병" backgroundColor="white_bg">
          <Tab.List>
            {SECTIONS.map(({ key, title }) => (
              <Tab.Item
                key={key}
                value={title}
                scrollTarget={scrollRefs[key].element}
              />
            ))}
          </Tab.List>
        </Tab.Container>
      </div>
      <div className={styles.container}>
        {SECTIONS.map(({ key, Component }) => (
          <section
            key={key}
            ref={scrollRefs[key].element}
            className={styles.section}
          >
            <Component
              sectionData={reportDetailData?.[key]}
              reportId={reportId}
            />
          </section>
        ))}
        <div className={styles.bottomTextContainer}>
          <p className={styles.subText}>{TEXT.SUB_TEXT}</p>
          <Button size="lg">{TEXT.BUTTON_TEXT}</Button>
          <button className={styles.homeText} onClick={handleClick}>
            {TEXT.HOME_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
