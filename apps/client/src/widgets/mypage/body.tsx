import { Avatar, Button } from '@bds/ui';

import Preview from './preview';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
  isRecommendInsurance?: boolean;
  onClick: () => void;
}

const BUTTON_TEXT = {
  TRUE: '내 보험 추천 리포트',
  FALSE: '보험 추천 받으러 가기',
};

const Body = ({
  nickname,
  profileImage,
  isRecommendInsurance,
  onClick,
}: ContentProps) => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} src={profileImage} />
        <div className={styles.contentName}>
          {nickname}
          <Button variant="white_fill" size="lg" onClick={onClick}>
            {isRecommendInsurance ? BUTTON_TEXT.TRUE : BUTTON_TEXT.FALSE}
          </Button>
        </div>
      </div>
      <Preview />
    </section>
  );
};

export default Body;
