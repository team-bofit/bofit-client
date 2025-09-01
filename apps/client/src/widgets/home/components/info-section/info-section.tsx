import { IconName } from 'node_modules/@bds/ui/src/icons/icon-list.ts';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import HomeCard from '@widgets/home/components/home-chip/home-chip.tsx';
import { homeChipConfig } from '@widgets/home/configs/home-chip-config.ts';

import InsuranceTitle from '@shared/components/insurance-title/insurance-title.tsx';
import { routePath } from '@shared/router/path.ts';

import * as styles from './info-section.css.ts';

/** 보험 추천받지 않은 유저가 볼 화면 */
export const InfoSection = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${routePath.ONBOARDING}?step=user`);
  };

  return (
    <section className={styles.infoSection}>
      <img
        src={'./3Dicon_background_glass.webp'}
        width={223}
        height={185}
        className={styles.backgroundLogo}
      />
      <div className={styles.titleSection}>
        <InsuranceTitle fontColor={'white'} fontStyle={'eb_28'} />
        <p className={styles.subTitle}>
          딱 맞는 보험, 어렵지 않게 찾을 수 있어요!
        </p>
      </div>
      <div className={styles.homeChipList}>
        <Swiper
          spaceBetween={8}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1500}
          modules={[Autoplay]}
          allowTouchMove={true}
          centeredSlides={true}
          className={styles.homeChipList}
        >
          {homeChipConfig.map((chip, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <HomeCard
                icon={
                  <Icon
                    name={chip.icon as IconName}
                    className={styles.homeChipIcon}
                  />
                }
                title={chip.target}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.bottomButton}>
        <Button variant={'white_fill'} size={'lg'} onClick={handleNavigate}>
          맞춤 보험 추천 받으러 가기
        </Button>
      </div>
    </section>
  );
};
