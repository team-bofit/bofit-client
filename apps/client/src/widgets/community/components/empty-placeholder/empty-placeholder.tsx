import { Icon } from '@bds/ui/icons';

import * as styles from './empty-placeholder.css';

interface EmptyPlaceholderProps {
  content: string;
}

const EmptyPlaceholder = ({ content }: EmptyPlaceholderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Icon name="empty_writing" width="13.5rem" height="9rem" />
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default EmptyPlaceholder;
