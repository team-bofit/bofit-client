import { Button, TextButton } from '@bds/ui';

import * as styles from '@widgets/onboarding/components/step/start-content/start-content.css';

interface StartContentProps {
  userName?: string;
  handleGoHome: () => void;
  go: (step: number) => void;
}

const TEXT = {
  TITLE: '님을 위한 맞춤 추천,\n지금 시작할게요!',
  MESSAGE: '꼭 맞는 보험을 찾을 수 있도록, \n간단히 몇 개만 여쭤볼게요.',
};

const StartContent = ({ userName, handleGoHome, go }: StartContentProps) => {
  const titleText = `${userName}${TEXT.TITLE}`;

  return (
    <>
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
      <div className={styles.startBottomContainer}>
        <Button type="button" variant="primary" size="lg" onClick={() => go(1)}>
          정보 입력 시작하기
        </Button>
        <TextButton color="black" onClick={handleGoHome}>
          나중에 추천받을래요
        </TextButton>
      </div>
    </>
  );
};

export default StartContent;
