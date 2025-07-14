import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './ipwon.css';

const ipwonData = {
  descriptionInfo:
    '입원할 경우 하루 단위로 정액 보장이 나와요. 수술·중증 질환 치료와 함께 설계하면 좋아요.',
};

const Ipwon = () => {
  return (
    <div className={styles.container}>
      <Divider>입원</Divider>
      <div className={styles.contentContainer}>
        <Info
          description={ipwonData.descriptionInfo}
          size="md"
          iconSize="2rem"
        />
        <Jilbyeong />
        <Sanghae />
      </div>
    </div>
  );
};

export default Ipwon;
