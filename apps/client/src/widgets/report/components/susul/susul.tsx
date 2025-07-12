import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import JilbyeongClass from './components/jilbyeong-class';
import Sanghae from './components/sanghae';
import SanghaeClass from './components/sanghae-class';

import * as styles from './susul.css';

const Susul = () => {
  return (
    <div className={styles.container}>
      <Divider>수술</Divider>
      <div className={styles.infoContainer}>
        <Info
          size="md"
          description="예상치 못한 수술에 대비해 수술비를 보장해요. 종수술비는 수술 종류에 따라 금액이 달라지며, 숫자가 클수록 위험도가 높고 보장도 커져요."
          iconSize="2em"
        />
      </div>
      <div className={styles.contentsContainer}>
        <Jilbyeong />
        <JilbyeongClass />
        <Sanghae />
        <SanghaeClass />
      </div>
    </div>
  );
};

export default Susul;
