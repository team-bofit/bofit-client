import { Icon } from '@bds/ui/icons';

import * as styles from './indicator.css';

interface IndicatorProps {
  current: number;
  total: number;
}

const Indicator = ({ current, total }: IndicatorProps) => {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.min(Math.max(current, 1), safeTotal);

  return (
    <div className={styles.container}>
      {Array.from({ length: safeTotal }, (_, index) =>
        index + 1 === safeCurrent ? (
          <Icon
            key={index}
            name="page_selected"
            width="2.4rem"
            height="0.8rem"
          />
        ) : (
          <Icon
            key={index}
            name="page_unselected"
            width="0.8rem"
            height="0.8rem"
          />
        ),
      )}
    </div>
  );
};

export default Indicator;
