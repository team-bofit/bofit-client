import { Icon } from '@bds/ui/icons';

import * as styles from './indicator.css';

interface IndicatorProps {
  current: number;
  total: number;
}

const Indicator = ({ current, total }: IndicatorProps) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: total }, (_, index) =>
        index + 1 === current ? (
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
