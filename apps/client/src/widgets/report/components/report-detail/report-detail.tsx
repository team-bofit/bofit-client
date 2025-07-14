import { useRef } from 'react';
import { useNavigate } from 'react-router';

import { Button, Tab } from '@bds/ui';

import Ipwon from '../ipwon/ipwon';
import Janghae from '../janghae/janghae';
import Keunbyeong from '../keunbyeong/keunbyeong';
import Samang from '../samang/samang';
import Susul from '../susul/susul';

import * as styles from './report-detail.css';

const TAB_TITLE = ['큰 병', '수술', '입원', '장해', '사망'];

const TEXT = {
  BUTTON_TEXT: '더 자세한 보장 알아보기',
  SUB_TEXT: '이 보험에 관심이 있다면',
  HOME_TEXT: '홈으로',
};

const ReportDetail = () => {
  const navigate = useNavigate();

  const keunbyeongRef = useRef<HTMLDivElement>(null);
  const susulRef = useRef<HTMLDivElement>(null);
  const ipwonRef = useRef<HTMLDivElement>(null);
  const janghaeRef = useRef<HTMLDivElement>(null);
  const samangRef = useRef<HTMLDivElement>(null);

  const ELEMENT_REFS = [
    keunbyeongRef,
    susulRef,
    ipwonRef,
    janghaeRef,
    samangRef,
  ];

  const tabList = TAB_TITLE.map((title, idx) => ({
    title,
    ref: ELEMENT_REFS[idx],
  }));

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <Tab.Container initialValue="큰병">
        <div className={styles.tabContainer}>
          <Tab.List>
            {tabList.map(({ title, ref }, index) => (
              <Tab.Item key={index} value={title} scrollTarget={ref} />
            ))}
          </Tab.List>
        </div>
      </Tab.Container>
      <div className={styles.container}>
        <div ref={keunbyeongRef}>
          <Keunbyeong />
        </div>
        <div ref={susulRef}>
          <Susul />
        </div>
        <div ref={ipwonRef}>
          <Ipwon />
        </div>
        <div ref={janghaeRef}>
          <Janghae />
        </div>
        <div ref={samangRef}>
          <Samang />
        </div>
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
