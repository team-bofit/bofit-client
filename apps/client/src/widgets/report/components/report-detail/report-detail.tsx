import { useRef } from 'react';
import { useNavigate } from 'react-router';

import { Button, Tab } from '@bds/ui';

import { routePath } from '@shared/router/path';

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
    navigate(routePath.HOME);
  };

  return (
    <div ref={keunbyeongRef}>
      <div className={styles.tabStickyContainer}>
        <Tab.Container initialValue="큰 병">
          <Tab.List>
            {tabList.map(({ title, ref }, index) => (
              <Tab.Item key={index} value={title} scrollTarget={ref} />
            ))}
          </Tab.List>
        </Tab.Container>
      </div>
      <div className={styles.container}>
        <div ref={keunbyeongRef} className={styles.section}>
          <Keunbyeong />
        </div>
        <div ref={susulRef} className={styles.section}>
          <Susul />
        </div>
        <div ref={ipwonRef} className={styles.section}>
          <Ipwon />
        </div>
        <div ref={janghaeRef} className={styles.section}>
          <Janghae />
        </div>
        <div ref={samangRef} className={styles.section}>
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
    </div>
  );
};

export default ReportDetail;
