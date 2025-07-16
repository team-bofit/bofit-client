import { Icon } from '@bds/ui/icons';

import * as styles from './info.css';

interface AdditionalProps {
  description?: string;
  size: 'md' | 'sm';
  iconSize: string;
}

const Info = ({ size, description, iconSize }: AdditionalProps) => {
  return (
    <div className={styles.additionalContainer({ size })}>
      <div className={styles.iconContainer}>
        <Icon name="bulb" size={iconSize} color="primary500" />
      </div>
      <dd className={styles.contents({ size })}>{description}</dd>
    </div>
  );
};

export default Info;
