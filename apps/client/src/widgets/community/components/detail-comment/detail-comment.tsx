import { Avatar, Content, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { BULLET } from '@shared/constants/bullet';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './detail-comment.css';

interface DetailCommentProps {
  title?: string;
  text?: string;
  writerNickname?: string;
  createdAt?: string;
  commentCount?: number;
  onClick: () => void;
  profileImageUrl: string;
}

const DetailComment = ({
  title,
  text,
  writerNickname,
  createdAt,
  commentCount,
  onClick,
  profileImageUrl,
}: DetailCommentProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.contentBox}>
        <Title fontStyle="bd_sm">{title}</Title>
        <Content text={text} length="md" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userInfoLeft}>
          <Avatar size="sm" src={profileImageUrl} />
          <div className={styles.infoContent}>
            <p className={styles.nickName}>{writerNickname}</p>
            <p className={styles.point}>{BULLET}</p>
            <p className={styles.createdAt}>{getTimeAgo(createdAt)}</p>
          </div>
        </div>
        <div className={styles.commentNum}>
          <Icon name="chat_square" width="2rem" height="2rem" color="gray600" />
          <div className={styles.commentNumColor}>{commentCount}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailComment;
