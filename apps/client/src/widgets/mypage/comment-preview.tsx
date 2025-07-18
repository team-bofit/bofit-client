import { Title } from '@bds/ui';

import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './comment-preview.css';
import { contentText } from './post-preview.css';

interface CommentPreviewProps {
  content?: string;
  createdAt?: string;
  onClick: VoidFunction;
}

const CommentPreview = ({
  content,
  createdAt,
  onClick,
}: CommentPreviewProps) => {
  return (
    <section className={styles.commentContainer} onClick={onClick}>
      <div className={styles.commentContent}>
        <Title fontStyle="tt_md">{content}</Title>
        <p className={contentText.medium}>{getTimeAgo(createdAt)}</p>
      </div>
    </section>
  );
};

export default CommentPreview;
