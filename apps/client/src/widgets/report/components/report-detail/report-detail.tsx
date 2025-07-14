import { useNavigate } from 'react-router';

import { Button, Tab } from '@bds/ui';

import Ipwon from '../ipwon/ipwon';
import Janghae from '../janghae/janghae';
import Keunbyeong from '../keunbyeong/keunbyeong';
import Samang from '../samang/samang';
import Susul from '../susul/susul';

import * as styles from './report-detail.css';

const TAB_TITLE = [
  { TITLE: '큰 병' },
  { TITLE: '수술' },
  { TITLE: '입원' },
  { TITLE: '장해' },
  { TITLE: '사망' },
];

const TEXT = {
  BUTTON_TEXT: '더 자세한 보장 알아보기',
  SUB_TEXT: '이 보험에 관심이 있다면',
  HOME_TEXT: '홈으로',
};

const ReportDetail = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <>
      <Tab.Container initialValue="큰병">
        <div className={styles.tabContainer}>
          <Tab.List>
            {TAB_TITLE.map(({ TITLE }, index) => (
              <Tab.Item key={index} value={TITLE} />
            ))}
          </Tab.List>
        </div>
      </Tab.Container>
      <div className={styles.container}>
        <Keunbyeong />
        <Susul />
        <Ipwon />
        <Janghae />
        <Samang />
        <div className={styles.bottomTextContainer}>
          <p className={styles.subText}>{TEXT.SUB_TEXT}</p>
          <Button size="lg">{TEXT.BUTTON_TEXT}</Button>
          <button className={styles.homeText} onClick={handleClick}>
            {TEXT.HOME_TEXT}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportDetail;
