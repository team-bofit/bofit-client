import { Avatar, Button, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import AccountMenuBar from '@widgets/mypage/components/account-menu-bar/account-menu-bar';
import Preview from '@widgets/mypage/components/preview/preview';

import { useToggle } from '@shared/hooks/use-toggle';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
}

const Body = ({ nickname, profileImage }: ContentProps) => {
  const [isEditing, toggleEditing] = useToggle(false);

  const handleProfileEdit = () => {
    toggleEditing();
  };

  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <div className={styles.userProfileSection}>
          <Avatar size={'lg'} src={profileImage} />
          <div className={styles.addImageContainer}>
            <Icon
              name="img_add"
              width={'2rem'}
              height={'2rem'}
              color="gray900"
            />
          </div>
        </div>
        <div className={styles.contentName}>
          {nickname}
          <Button variant="white_fill" size="lg" onClick={handleProfileEdit}>
            {isEditing ? '프로필 편집 완료하기' : '프로필 편집'}
          </Button>
        </div>
      </div>
      <Preview />
      <AccountMenuBar />
    </section>
  );
};

export default Body;
