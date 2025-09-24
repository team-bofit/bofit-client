import { ReactNode } from 'react';

import { Icon } from '@bds/ui/icons';

import * as styles from './info-box.css';

interface InfoBoxProps {
  description?: string;
  size: 'md' | 'sm';
  iconSize: string;
  highlightDescription?: ReactNode;
}

const InfoBox = ({
  size,
  description,
  iconSize,
  highlightDescription,
}: InfoBoxProps) => {
  return (
    <div className={styles.additionalContainer({ size })}>
      <div className={styles.iconContainer}>
        <Icon name="bulb" size={iconSize} color="primary500" />
      </div>
      <p className={styles.contents({ size })}>
        {highlightDescription ?? description}
      </p>
    </div>
  );
};

export default InfoBox;
