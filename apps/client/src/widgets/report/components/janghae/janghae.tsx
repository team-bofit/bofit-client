import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './janhae.css';

const ipwonData = {
  descriptionInfo:
    '질병이나 사고로 인한 영구적 신체 손상을 보장해요. 보통 장해지급률 3% 이상부터 해당하며, 3%는 시력 상실, 10%는 손가락 절단 등이 포함돼요.',
};

const Janghae = () => {
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

export default Janghae;
