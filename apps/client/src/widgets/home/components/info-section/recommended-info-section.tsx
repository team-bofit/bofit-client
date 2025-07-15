import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Chip, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import HomeChip from '@widgets/home/components/home-chip/home-chip.tsx';

import InsuranceSubtitle from '@shared/components/insurance-subtitle/insurance-subtitle.tsx';
import InsuranceTitle from '@shared/components/insurance-title/insurance-title.tsx';
import { routePath } from '@shared/router/path.ts';

import * as styles from './recommended-info-section.css.ts';

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
  status: '충분' | '부족' | '강력';
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

/** 보험 추천받은 유저가 볼 화면 */
export const RecommendedInfoSection = () => {
  const navigate = useNavigate();
  const handleNavigateReport = () => {
    navigate(routePath.REPORT);
  };

  return (
    <section className={styles.infoSection}>
      <img
        src={'./3Dicon_background.webp'}
        width={223}
        height={185}
        className={styles.backgroundLogo}
      />
      <div className={styles.titleSection}>
        <InsuranceSubtitle
          name={'민정'}
          type={'home'}
          fontColor={'primary100'}
          fontStyle={'sb_14'}
          style={{ marginBottom: '4px' }}
        />
        <InsuranceTitle
          fontColor={'white'}
          fontStyle={'eb_28'}
          name={'OO보험'}
          company={'OO보험사'}
        />
        <div className={styles.chipList}>
          <Chip
            label="# 중대 질환 든든 보장"
            fontColor="gray"
            backgroundColor="primary200"
            shape="rounded"
            zIndex={'content'}
          />
          <Chip
            label="# 합리적인 보험료"
            fontColor="gray"
            backgroundColor="primary200"
            shape="rounded"
            zIndex={'content'}
          />
        </div>
      </div>
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
              status={chip.status}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.bottomButton}>
        <TextButton color={'white'} onClick={handleNavigateReport}>
          <p>구체적인 내용 확인하기</p>
          <Icon name={'caret_right_md'} color="white" />
        </TextButton>
      </div>
    </section>
  );
};
