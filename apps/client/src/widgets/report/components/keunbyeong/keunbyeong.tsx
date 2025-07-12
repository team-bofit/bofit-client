import Divider from '../divider/divider';
import Info from '../info/info';
import Cancer from './components/cancer';
import Noehyeolgwan from './components/noehyeolgwan';
import Shimjang from './components/shimjang';
import { keunbyeongData } from './mocks/keunbyeong-mocks';

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
