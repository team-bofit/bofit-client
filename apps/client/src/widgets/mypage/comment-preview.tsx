import { Title } from '@bds/ui';

import { getTimeAgo } from '@shared/api/utils/get-time-ago';

import * as styles from './comment-preview.css';
import { contentText } from './post-preview.css';

interface CommentPreviewProps {
  content?: string;
  createdAt?: string;
}

const CommentPreview = ({ content, createdAt }: CommentPreviewProps) => {
  return (
    <section className={styles.commentContainer}>
      <Title fontStyle="tt_md">{content}</Title>
      <p className={contentText.medium}>{getTimeAgo(createdAt)}</p>
    </section>
  );
};

export default CommentPreview;
