import { Content, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './post-preview.css';

interface PostPreviewProps {
  content: string;
  title: string;
  createdAt: string;
  commentCount?: number;
  onClick?: VoidFunction;
}

const PostPreview = ({
  content,
  title,
  createdAt,
  commentCount,
  onClick,
}: PostPreviewProps) => {
  return (
    <section className={styles.container} onClick={onClick}>
      <div className={styles.titleContentContainer}>
        <Title fontStyle="bd_sm">{title}</Title>
        <div className={styles.contentContainer}>
          <Content text={content} length="md" />
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.commentInfoContainer}>
          <Icon name="chat_square" color="gray600" />
          <p className={styles.commentCountText}>{commentCount}</p>
        </div>
        <p className={styles.timeText}>{getTimeAgo(createdAt)}</p>
      </div>
    </section>
  );
};

export default PostPreview;
