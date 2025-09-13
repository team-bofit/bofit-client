import { Avatar, TextButton } from '@bds/ui';

import * as styles from './user-comment.css';

interface UserCommentProps {
  content?: string;
  writerNickName?: string;
  createdAt?: string;
  onClickDelete?: VoidFunction;
  profileImage?: string;
  isCommentOwner: boolean;
}

const DELETE_CONTENT = '삭제';

const UserComment = ({
  content,
  writerNickName,
  createdAt,
  onClickDelete,
  profileImage,
  isCommentOwner,
}: UserCommentProps) => {
  return (
    <article className={styles.container}>
      <article className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <Avatar size="md" src={profileImage} />
          <div>
            <h2 className={styles.nickName}>{writerNickName}</h2>
            <p className={styles.timestamp}>{createdAt}</p>
          </div>
        </div>
        <div className={styles.button}>
          {isCommentOwner ? (
            <TextButton color="black" onClick={onClickDelete} size="sm">
              {DELETE_CONTENT}
            </TextButton>
          ) : (
            ''
          )}
        </div>
      </article>
      <p className={styles.comment}>{content}</p>
    </article>
  );
};

export default UserComment;
