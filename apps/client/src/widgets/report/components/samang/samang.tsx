import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './samang.css';

const ipwonData = {
  descriptionInfo:
    '사망 시 가족에게 지급되는 보장금으로, 생활비와 장례비에 도움이 돼요. 질병사망과 상해사망으로 구분되며, 상해사망은 사고 위험을 반영해 보장 금액이 더 높아요.',
};

const TEXT_TITLE = '사망';

const Samang = () => {
  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
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

export default Samang;
