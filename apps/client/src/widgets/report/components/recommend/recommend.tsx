import { Icon } from '@bds/ui/icons';

import * as styles from './recommend.css';

interface RecommendProps {
  reasonList: string[];
}

const REASON = '추천 이유';
const BULLET = '\u2022';

const Recommend = ({ reasonList }: RecommendProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.icon}>
          <Icon
            name="bulb"
            color="primary500"
            width="1.92rem"
            height="1.92rem"
          />
        </div>
        <p className={styles.reason}>{REASON}</p>
      </div>
      <ul className={styles.bottomContainer}>
        {reasonList.map((item, index) => (
          <li key={index} className={styles.description}>
            <span>{BULLET}</span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommend;
