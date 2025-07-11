import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: string;
  nickName: string;
  timestamp: number;
  onClickDelete?: () => void;
}

const DELETE_CONTENT = '삭제';
const TIME_BEFORE = '시간 전';

const UserComment = ({
  comment,
  nickName,
  timestamp,
  onClickDelete,
}: UserCommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <Avatar size="md" />
          <div className={styles.userMeta}>
            <p className={styles.nickName}>{nickName}</p>
            <p className={styles.timestamp}>
              {timestamp}
              {TIME_BEFORE}
            </p>
          </div>
        </div>
        <div className={styles.button}>
          <TextButton color="black" onClick={onClickDelete}>
            {DELETE_CONTENT}
          </TextButton>
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default UserComment;
