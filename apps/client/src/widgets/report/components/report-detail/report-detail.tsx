import { useNavigate } from 'react-router';

import { Button, Tab } from '@bds/ui';

import { SECTIONS } from '@widgets/report/constant/section-component-constant';
import TabSync from '@widgets/report/hooks/tab-sync';
import {
  useActiveSection,
  useMoveScroll,
} from '@widgets/report/hooks/use-move-scroll';

import { InsuranceReport } from '@shared/api/types/types';
import { routePath } from '@shared/router/path';

import * as styles from './report-detail.css';

const TEXT = {
  BUTTON_TEXT: '더 자세한 보장 알아보기',
  SUB_TEXT: '이 보험에 관심이 있다면, ',
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

  const { currentCategory, handleCategoryClick } = useActiveSection(scrollRefs);

  const handleClick = () => {
    navigate(routePath.HOME);
  };

  const handleButtonClick = () => {
    window.open(reportDetailData?.externalUri);
  };

  return (
    <div>
      <div className={styles.tabStickyContainer}>
        <Tab.Container
          initialValue="큰 병"
          backgroundColor="white_bg"
          onValueChange={(label) => {
            const found = SECTIONS.find((s) => s.title === label);
            if (found) {
              handleCategoryClick(found.key);
            }
          }}
        >
          <TabSync currentCategory={currentCategory} />
          <Tab.List>
            {SECTIONS.map(({ key, title }) => (
              <Tab.Item
                key={key}
                value={title}
                isSelected={currentCategory === key}
                scrollTarget={scrollRefs[key].element}
                onClick={() => handleCategoryClick(key)}
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
          <Button size="lg" onClick={handleButtonClick}>
            {TEXT.BUTTON_TEXT}
          </Button>
          <button className={styles.homeText} onClick={handleClick}>
            {TEXT.HOME_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
