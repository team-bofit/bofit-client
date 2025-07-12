import Lottie from 'lottie-react';

import animationData from '@shared/assets/glass_icon_logo_animation.json';

import * as styles from '@widgets/onboarding/components/matching-loader/matching-loader.css';

interface MatchingLoaderProps {
  userName: string;
}
const TEXT = {
  SUB_TITLE: '정보입력 완료!',
  TITLE: '님에게 딱 맞는\n보험을 찾는 중이에요',
};

const MatchingLoader = ({ userName }: MatchingLoaderProps) => {
  const titleText = `${userName}${TEXT.TITLE}`;

  return (
    <section className={styles.container}>
      <p className={styles.subTitle}>{TEXT.SUB_TITLE}</p>
      <h2 className={styles.title}>{titleText}</h2>
      <Lottie animationData={animationData} loop autoplay />
    </section>
  );
};

export default MatchingLoader;
