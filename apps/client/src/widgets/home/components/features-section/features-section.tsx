import { Indicator } from '@bds/ui';
import { Icon } from '@bds/ui/icons';
import { useNavigate } from 'react-router-dom';

import CommunityLink from '@widgets/home/components/community-link/community-link.tsx';
import Tip from '@widgets/home/components/tip/tip.tsx';

import { routePath } from '@shared/router/path.ts';

import * as styles from './features-section.css.ts';

export const FeaturesSection = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath.COMMUNITY);
  };

  return (
    <section className={styles.featureSection}>
      <div className={styles.communityContainer}>
        <div className={styles.sectionTitle}>
          <Icon name={'chat_conversation'} />
          <p className={styles.title}>커뮤니티</p>
        </div>
        <CommunityLink onClick={handleNavigate} />
      </div>
      <div className={styles.insuranceContainer}>
        <div className={styles.sectionTitle}>
          <Icon name={'bulb'} />
          <p className={styles.title}>보험 Tip</p>
        </div>
        <div className={styles.tipList}>
          <Tip
            title={'보험 상령일이란?'}
            contents={'생일에 6개월을 더한 날로, 보험료 인상 기준이 돼요.'}
          />
          <Tip
            title={'진단비와 수술비의 차이'}
            contents={'진단비는 병명 확정 시, 수술비는 실제 수술 시 지급돼요.'}
            bgColor={'gray'}
          />
          <Tip
            title={'비갱신형 보험이 뭐예요?'}
            contents={'약관이 바뀌지 않고 보험료도 만기까지 그대로 유지돼요.'}
          />
        </div>
        <div className={styles.indicatorContainer}>
          <Indicator current={1} total={3} />
        </div>
      </div>
    </section>
  );
};
