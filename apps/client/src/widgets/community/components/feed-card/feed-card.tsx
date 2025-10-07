import { Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import * as styles from './feed-card.css';

interface FeedCardProps {
  title: string;
  content: string;
  commentCount: number;
  likeCount: number;
  onClick: () => void;
}

const FeedCard = ({
  title,
  content,
  commentCount,
  likeCount,
}: FeedCardProps) => {
  return (
    <div className={styles.container}>
      <Title fontStyle="bd_sm">{title}</Title>

      <div className={styles.contentWrapper}>{content}</div>

      <div className={styles.stats}>
        <div className={styles.heart}>
          <Icon name="heart" width="2rem" height="2rem" />
          <p className={styles.statsNumber}>{likeCount}</p>
        </div>
        <div className={styles.reply}>
          <Icon name="chat_square" width="2rem" height="2rem" />
          <p className={styles.statsNumber}>{commentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
