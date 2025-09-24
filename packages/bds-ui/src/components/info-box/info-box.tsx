import { Icon } from '@bds/ui/icons';

import * as styles from './info-box.css';

interface InfoBoxProps {
  description?: string;
  size: 'md' | 'sm';
  iconSize: string;
}

const InfoBox = ({ size, description, iconSize }: InfoBoxProps) => {
  return (
    <div className={styles.additionalContainer({ size })}>
      <div className={styles.iconContainer}>
        <Icon name="bulb" size={iconSize} color="primary500" />
      </div>
      <dd className={styles.contents({ size })}>{description}</dd>
    </div>
  );
};

export default InfoBox;
