import * as styles from '@widgets/onboarding/components/step/start-content/start-content.css';

interface StartContentProps {
  userName?: string;
}

const TEXT = {
  TITLE: '님을 위한 맞춤 추천,\n지금 시작할게요!',
  MESSAGE: '꼭 맞는 보험을 찾을 수 있도록, \n간단히 몇 개만 여쭤볼게요.',
};

const StartContent = ({ userName }: StartContentProps) => {
  const titleText = `${userName}${TEXT.TITLE}`;

  return (
    <section className={styles.container}>
      <p className={styles.title}>{titleText}</p>
      <p className={styles.message}>{TEXT.MESSAGE}</p>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="./glass_icon_info_check.webp"
          alt="Onboarding Start"
        />
      </div>
    </section>
  );
};

export default StartContent;
