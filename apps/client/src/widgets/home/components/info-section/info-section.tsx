import { Chip } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import HomeChip from '@widgets/home/components/home-chip/home-chip.tsx';

import InsuranceTitle from '@shared/components/insurance-title/insurance-title.tsx';

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
];

export const InfoSection = () => {
  return (
    <section className={styles.infoSection}>
      <img
        src={'./home_default_3D_logo.png'}
        width={223}
        height={185}
        className={styles.backgroundLogo}
      />
      <div className={styles.titleSection}>
        <p className={styles.subTitle}>OO님께 딱 맞는 보험이에요</p>
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
      <div className={styles.homeChipList}>
        {homeChipData.map((chip, index) => (
          <HomeChip
            key={index}
            icon={<Icon name={chip.icon} className={styles.homeChipIcon} />}
            title={chip.title}
            status={chip.status}
          />
        ))}
      </div>
      <div className={styles.bottomButton}>
        <button className={styles.button}>
          <p>구체적인 내용 확인하기</p>
          <Icon name={'caret_right_md'} color="white" />
        </button>
      </div>
    </section>
  );
};
