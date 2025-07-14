import { Avatar, Button } from '@bds/ui';

import { routePath } from '@shared/router/path';

import Preview from './preview';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  onClick: (route: string) => void;
}

const Body = ({ nickname, onClick }: ContentProps) => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} />
        <div className={styles.contentName}>
          {nickname}
          <Button
            variant="white_fill"
            onClick={() => onClick(routePath.REPORT)}
          >
            내 보험 추천 리포트
          </Button>
        </div>
      </div>
      <Preview />
    </section>
  );
};

export default Body;
