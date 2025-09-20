import { Icon } from '@bds/ui/icons';

import * as styles from './alert.css';

interface AlertProps {
  iconName: 'info' | 'info_warning';
  iconSize: string;
  alertHeader: string;
  alertContents: string;
  type: 'additional' | 'info';
  highlight?: string;
}
/**
 * Alert 컴포넌트는 알림 메시지를 표시하는 컴포넌트입니다.
 * @param iconName - Icon name
 * @param iconSize - Icon height과 width
 * @param alertHeader - alert에 들어갈 헤더 (참고하세요!, 알려드려요)
 * @param alertContents -alert에 들어갈 contents
 * @returns
 */

const Alert = ({
  iconName,
  iconSize,
  alertHeader,
  alertContents,
  type,
  highlight,
}: AlertProps) => {
  return (
    <div className={styles.alertContainer({ type })}>
      <div className={styles.alerIconContainer({ type })}>
        <Icon
          color="primary500"
          name={iconName}
          width={iconSize}
          height={iconSize}
          className={styles.iconStyle}
        />
        <p className={styles.alertHeader}>{alertHeader}</p>
      </div>
      <p className={styles.alertContents({ type })}>
        {type === 'additional' && (
          <span className={styles.alertContentsHighlight}>[{highlight}]</span>
        )}
        {alertContents}
      </p>
    </div>
  );
};

export default Alert;
