import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Indicator } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommunityLink from '@widgets/home/components/community-link/community-link.tsx';
import Tip from '@widgets/home/components/tip/tip.tsx';

import { routePath } from '@shared/router/path.ts';

import * as styles from './features-section.css.ts';

interface featureSectionProps {
  height?: 'md' | 'lg';
}

export const FeaturesSection = ({ height = 'md' }: featureSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routePath.COMMUNITY);
  };

  return (
    <section className={styles.featureSection({ height })}>
      <div className={styles.communityContainer}>
        <div className={styles.titleSection}>
          <Icon name="chat_conversation" color="gray800" />
          <p className={styles.title}>커뮤니티</p>
        </div>
        <CommunityLink onClick={handleNavigate} />
      </div>
      <div>
        <div className={styles.tipTitleSection}>
          <Icon name="bulb" color="gray800" />
          <p className={styles.title}>보험 Tip</p>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          loop={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={500}
          modules={[Pagination]}
          centeredSlides={false}
          onSlideChange={(swiper) => setCurrentPage(swiper.realIndex)}
          onReachEnd={() => setCurrentPage(2)}
          className={styles.tipList}
        >
          <SwiperSlide className={styles.slideItem}>
            <Tip
              title="보험 상령일이란?"
              contents="생일에 6개월을 더한 날로, 보험료 인상 기준이 돼요."
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slideItem}>
            <Tip
              title="진단비와 수술비의 차이"
              contents="진단비는 병명 확정 시, 수술비는 실제 수술 시 지급돼요."
              bgColor={'gray'}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.slideItem}>
            <Tip
              title="비갱신형 보험이 뭐예요?"
              contents="약관이 바뀌지 않고 보험료도 만기까지 그대로 유지돼요."
            />
          </SwiperSlide>
        </Swiper>
        <div className={styles.indicatorContainer}>
          <Indicator current={currentPage} total={3} />
        </div>
      </div>
    </section>
  );
};
