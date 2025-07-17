import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-detail-meta.css';

interface UserDetailMetaProps {
  nickName: string;
  createdAt: string;
  profileImage: string;
  isOwner: boolean;
  onClick: () => void;
}

const BUTTON_TEXT = {
  EDIT: '수정',
  DELETE: '삭제',
};

const UserDetailMeta = ({
  nickName,
  createdAt,
  profileImage,
  isOwner,
  onClick,
}: UserDetailMetaProps) => {
  return (
    <div className={styles.userMetaContainer}>
      <div className={styles.userMeta}>
        <Avatar size="md" src={profileImage} />
        <div>
          <h2 className={styles.nickName}>{nickName}</h2>
          <p className={styles.createdAt}>{createdAt}</p>
        </div>
      </div>
      {isOwner ? (
        <div className={styles.button}>
          <TextButton
            color="primary"
            style={{ padding: '0.6rem 0.8rem' }}
            onClick={onClick}
          >
            {BUTTON_TEXT.EDIT}
          </TextButton>
          <TextButton color="black" style={{ padding: '0.6rem 0.8rem' }}>
            {BUTTON_TEXT.DELETE}
          </TextButton>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserDetailMeta;
