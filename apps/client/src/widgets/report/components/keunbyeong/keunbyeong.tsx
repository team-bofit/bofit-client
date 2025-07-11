import Divider from '../divider/divider';
import Info from '../info/info';
import Cancer from './cancer';
import { keunbyeongData } from './mocks/keunbyeong-mocks';
import Noehyeolgwan from './noehyeolgwan';
import Shimjang from './shimjang';

import * as styles from './keunbyeong.css';

const Keunbyeong = () => {
  return (
    <div className={styles.dividerContainer}>
      <Divider>큰 병</Divider>
      <div className={styles.contentsContainer}>
        <Info
          description={keunbyeongData.additional_info}
          size="md"
          iconSize="2rem"
        />
        <Cancer />
        <Noehyeolgwan />
        <Shimjang />
      </div>
    </div>
  );
};

export default Keunbyeong;
