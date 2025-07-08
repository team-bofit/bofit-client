import { Icon } from '@bds/ui/icons';

import { EMPTY_COMMENT } from '@widgets/community/constant/empty_content';

import * as styles from './empty-placeholder.css';

const EmptyPlaceholder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Icon
          name="empty_writing"
          color="gray100"
          width="13.5rem"
          height="9rem"
        />
      </div>
      <p className={styles.content}>{EMPTY_COMMENT}</p>
    </div>
  );
};

export default EmptyPlaceholder;
