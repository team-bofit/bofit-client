import { Content, Title } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { getTimeAgo } from '@shared/api/utils/get-time-ago';

import * as styles from './post-preview.css';

interface PostPreviewProps {
  content: string;
  title: string;
  createdAt: string;
  commentCount?: number;
}

const PostPreview = ({
  content,
  title,
  createdAt,
  commentCount,
}: PostPreviewProps) => {
  return (
    <section className={styles.contentDivider}>
      <div className={styles.titleContentGap}>
        <Title fontStyle="bd_sm">{title}</Title>
        <Content text={content} length="md" />
      </div>

      <div className={styles.contentBottomContainer}>
        <div className={styles.commentContainer}>
          <Icon name="chat_square" color="gray600" />
          <p className={styles.contentText.large}>{commentCount}</p>
        </div>
        <p className={styles.contentText.medium}>{getTimeAgo(createdAt)}</p>
      </div>
    </section>
  );
};

export default PostPreview;
