import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: string;
  nickName: string;
  timestamp: number;
  onClickDelete?: VoidFunction;
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
    <article className={styles.container}>
      <article className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <Avatar size="md" />
          <div>
            <h2 className={styles.nickName}>{nickName}</h2>
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
      </article>
      <p className={styles.comment}>{comment}</p>
    </article>
  );
};

export default UserComment;
