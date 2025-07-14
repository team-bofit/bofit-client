import { Avatar, Button } from '@bds/ui';

import Preview from './preview';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
}

const Body = ({ nickname }: ContentProps) => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} />
        <div className={styles.contentName}>
          {nickname}
          <Button variant="white_fill">내 보험 추천 리포트</Button>
        </div>
      </div>
      <Preview />
    </section>
  );
};

export default Body;
