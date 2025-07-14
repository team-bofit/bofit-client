import { Avatar, Content, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { getTimeAgo } from '@widgets/community/utils/getTimeAgo';

import { BULLET } from '@shared/constants/bullet';

import * as styles from './detail-comment.css';

interface DetailCommentProps {
  title: string;
  text: string;
  writerNickName: string;
  createdAt: string;
  commentNum: number;
  onClick: () => void;
}

const DetailComment = ({
  title,
  text,
  writerNickName,
  createdAt,
  commentNum,
  onClick,
}: DetailCommentProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.contentBox}>
        <Title fontStyle="bd_sm">{title}</Title>
        <Content text={text} length="md" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userInfoLeft}>
          <Avatar size="sm" />
          <div className={styles.infoContent}>
            <p className={styles.nickName}>{writerNickName}</p>
            <p className={styles.point}>{BULLET}</p>
            <p className={styles.createdAt}>{getTimeAgo(createdAt)}</p>
          </div>
        </div>
        <div className={styles.commentNum}>
          <Icon name="chat_square" width="2rem" height="2rem" color="gray600" />
          <div className={styles.commentNumColor}>{commentNum}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailComment;
