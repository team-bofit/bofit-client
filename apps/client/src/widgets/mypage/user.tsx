import { Avatar, Button } from '@bds/ui';

import Preview from './preview';

import * as styles from './user.css';

const Content = () => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} />
        <div className={styles.contentName}>
          지욱
          <Button variant="white_fill">내 보험 추천 리포트</Button>
        </div>
      </div>
      <Preview />
    </section>
  );
};

export default Content;
