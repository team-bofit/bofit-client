import { Icon } from '@bds/ui/icons';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: string;
}

const UserComment = ({ comment }: UserCommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}></div>
        <div className={styles.button}></div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default UserComment;
