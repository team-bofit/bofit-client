import { Icon } from '@bds/ui/icons';

import * as styles from './recommend.css';

interface RecommendProps {
  description: string;
}

const REASON = '추천 이유';

const Recommend = ({ description }: RecommendProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.icon}>
          <Icon
            name="bulb"
            size="md"
            color="primary500"
            width="2.4rem"
            height="2.4rem"
          />
        </div>
        <p className={styles.reason}>{REASON}</p>
      </div>
      <ul className={styles.bottomContainer}>
        <li className={styles.description}>{description}</li>
      </ul>
    </div>
  );
};

export default Recommend;
