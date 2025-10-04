import { Avatar, Button } from '@bds/ui';

import AccountMenuBar from '@widgets/mypage/components/account-menu-bar/account-menu-bar';
import Preview from '@widgets/mypage/components/preview/preview';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
}

const Body = ({ nickname, profileImage }: ContentProps) => {
  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <Avatar size={'lg'} src={profileImage} />
        <div className={styles.contentName}>
          {nickname}
          <Button variant="white_fill" size="lg">
            프로필 편집
          </Button>
        </div>
      </div>
      <Preview />
      <AccountMenuBar />
    </section>
  );
};

export default Body;
