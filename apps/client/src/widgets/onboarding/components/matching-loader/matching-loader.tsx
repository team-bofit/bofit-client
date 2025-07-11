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
      <p className={styles.title}>{titleText}</p>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="./glass_icon_logo.webp"
          alt="Matching Loader"
        />
      </div>
    </section>
  );
};

export default MatchingLoader;
