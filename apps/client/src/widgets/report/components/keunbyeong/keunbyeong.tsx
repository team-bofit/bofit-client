import Divider from '../divider/divider';
import Info from '../info/info';
import Cancer from './components/cancer';
import Noehyeolgwan from './components/noehyeolgwan';
import Shimjang from './components/shimjang';

import * as styles from './keunbyeong.css';

const keunbyeongData = {
  additional_info:
    '3대 중증질환(암, 뇌혈관, 심장)은 발병률이 높고, 치료비 부담도 커요. 진단 즉시 목돈(진단비)이 지급돼 경제적 부담을 줄여줘요.',
};
const TEXT_TITLE = '큰병';

const Keunbyeong = () => {
  return (
    <div className={styles.dividerContainer}>
      <Divider>{TEXT_TITLE}</Divider>
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
