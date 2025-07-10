import { Button, TextButton } from '@bds/ui';

import * as styles from '@widgets/onboarding/components/start-content/start-content.css';

interface StartContentProps {
  userName: string;
}

const StartContent = ({ userName }: StartContentProps) => {
  const TITLE_TEXT = `${userName}님을 위한 맞춤 추천,\n지금 시작할게요!`;
  const MESSAGE_TEXT = `꼭 맞는 보험을 찾을 수 있도록, \n간단히 몇 개만 여쭤볼게요.`;

  return (
    <>
      <section className={styles.container}>
        <p className={styles.title}>{TITLE_TEXT}</p>
        <p className={styles.message}>{MESSAGE_TEXT}</p>

        <img
          className={styles.image}
          src="./glass_icon_info_check.webp"
          alt="Onboarding Start"
        />
      </section>
      <div className={styles.buttonContainer}>
        <Button variant="primary" size="lg">
          정보 입력 시작하기
        </Button>
        <TextButton color={'black'}>나중에 추천받을래요</TextButton>
      </div>
    </>
  );
};

export default StartContent;
