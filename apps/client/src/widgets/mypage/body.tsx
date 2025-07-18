import { Avatar, Button } from '@bds/ui';

import { routePath } from '@shared/router/path';

import Preview from './preview';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
  onClick: (route: string) => void;
}
const BUTTON_TEXT = '내 보험 추천 리포트';

const Body = ({ nickname, profileImage, onClick }: ContentProps) => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} src={profileImage} />
        <div className={styles.contentName}>
          {nickname}
          <Button
            variant="white_fill"
            size="lg"
            onClick={() => onClick(routePath.REPORT)}
          >
            {BUTTON_TEXT}
          </Button>
        </div>
      </div>
      <Preview />
    </section>
  );
};

export default Body;
