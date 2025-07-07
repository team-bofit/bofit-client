import { Content } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { ALERT_CONTENT } from './constant/ALERT_CONTENT';

import * as styles from './alert.css';

const Alert = () => {
  return (
    <div className={styles.container}>
      <div className={styles.alertHeader}>
        <Icon name="info" color="primary500" width="2.4rem" height="2.4rem" />
        <p className={styles.headerContent}>{ALERT_CONTENT.HEADER_CONTENT}</p>
      </div>
      <Content text={ALERT_CONTENT.BODY_CONTENT} length="sm" />
    </div>
  );
};

export default Alert;
