import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-detail-meta.css';

interface UserDetailMetaProps {
  nickName: string;
  createdAt: string;
  profileImage: string;
  isOwner: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const UserDetailMeta = ({
  nickName,
  createdAt,
  profileImage,
  isOwner,
  onEditClick,
  onDeleteClick,
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
            size="sm"
            color="black"
            style={{ padding: '0.6rem 0.8rem' }}
            onClick={onEditClick}
          >
            수정
          </TextButton>
          <TextButton
            size="sm"
            color="error"
            style={{ padding: '0.6rem 0.8rem' }}
            onClick={onDeleteClick}
          >
            삭제
          </TextButton>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserDetailMeta;
