import { Avatar, Content, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { BULLET } from '@shared/constants/bullet';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './feed-list-item.css';

interface FeedListItemProps {
  title?: string;
  text?: string;
  writerNickname?: string;
  createdAt?: string;
  commentCount?: number;
  likeCount?: number;
  isLiked?: boolean;
  onClick: () => void;
  profileImageUrl: string;
}

const FeedListItem = ({
  title,
  text,
  writerNickname,
  createdAt,
  commentCount,
  likeCount,
  isLiked,
  onClick,
  profileImageUrl,
}: FeedListItemProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.contentBox}>
        <Title fontStyle="bd_sm">{title}</Title>
        <Content text={text} length="md" />
      </div>
      <div className={styles.feedInfo}>
        <div className={styles.feedInfoLeft}>
          <Avatar size="sm" src={profileImageUrl} />
          <div className={styles.infoContent}>
            <p className={styles.nickName}>{writerNickname}</p>
            <p className={styles.point}>{BULLET}</p>
            <p className={styles.createdAt}>{getTimeAgo(createdAt)}</p>
          </div>
        </div>
        <div className={styles.feedInfoRight}>
          <div className={styles.postInfo}>
            <div>
              {isLiked ? (
                <Icon
                  name="heart_fill"
                  width="2rem"
                  height="2rem"
                  color="error"
                />
              ) : (
                <Icon name="heart" width="2rem" height="2rem" color="gray600" />
              )}
            </div>
            <p className={styles.postInfoNum}>{likeCount}</p>
          </div>
          <div className={styles.postInfo}>
            <Icon
              name="chat_square"
              width="2rem"
              height="2rem"
              color="gray600"
            />
            <p className={styles.postInfoNum}>{commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedListItem;
