import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-detail-meta.css';

interface UserDetailMetaProps {
  nickName: string;
  createdAt: number;
}

const UserDetailMeta = ({ nickName, createdAt }: UserDetailMetaProps) => {
  return (
    <div className={styles.userMetaContainer}>
      <div className={styles.userMeta}>
        <Avatar size="md" />
        <div>
          <h2 className={styles.nickName}>{nickName}</h2>
          <p className={styles.createdAt}>{createdAt}시간 전</p>
        </div>
      </div>
      <div className={styles.button}>
        <TextButton color="primary" style={{ padding: '0.6rem 0.8rem' }}>
          수정
        </TextButton>
        <TextButton color="black" style={{ padding: '0.6rem 0.8rem' }}>
          삭제
        </TextButton>
      </div>
    </div>
  );
};

export default UserDetailMeta;
