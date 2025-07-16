import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import HomeChip from '@widgets/home/components/home-chip/home-chip.tsx';

import InsuranceTitle from '@shared/components/insurance-title/insurance-title.tsx';
import { StatusType } from '@shared/types/type.ts';

import * as styles from './info-section.css.ts';

// HomeChip 데이터 타입
interface HomeChipData {
  icon:
    | '3d_brain'
    | '3d_cancer'
    | '3d_die'
    | '3d_disability'
    | '3d_heart'
    | '3d_hospital'
    | '3d_surgery';
  title: string;
  status: StatusType;
}

// HomeChip 데이터
const homeChipData: HomeChipData[] = [
  {
    icon: '3d_brain',
    title: '뇌혈관질환',
    status: '충분',
  },
  {
    icon: '3d_cancer',
    title: '암',
    status: '충분',
  },
  {
    icon: '3d_die',
    title: '사망',
    status: '부족',
  },
  {
    icon: '3d_disability',
    title: '장해',
    status: '강력',
  },
  {
    icon: '3d_heart',
    title: '심장질환',
    status: '충분',
  },
  {
    icon: '3d_hospital',
    title: '입원',
    status: '부족',
  },
  {
    icon: '3d_surgery',
    title: '수술',
    status: '강력',
  },
  {
    icon: '3d_brain',
    title: '뇌혈관질환',
    status: '충분',
  },
  {
    icon: '3d_cancer',
    title: '암',
    status: '충분',
  },
  {
    icon: '3d_die',
    title: '사망',
    status: '부족',
  },
  {
    icon: '3d_disability',
    title: '장해',
    status: '강력',
  },
  {
    icon: '3d_heart',
    title: '심장질환',
    status: '충분',
  },
  {
    icon: '3d_hospital',
    title: '입원',
    status: '부족',
  },
  {
    icon: '3d_surgery',
    title: '수술',
    status: '강력',
  },
];

/** 보험 추천받지 않은 유저가 볼 화면 */
export const InfoSection = () => {
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
          {homeChipData.map((chip, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <HomeChip
                icon={<Icon name={chip.icon} className={styles.homeChipIcon} />}
                title={chip.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.bottomButton}>
        <Button variant={'white_fill'} size={'lg'}>
          맞춤 보험 추천 받으러 가기
        </Button>
      </div>
    </section>
  );
};
