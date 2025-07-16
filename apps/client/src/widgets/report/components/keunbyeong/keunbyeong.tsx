import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';

import Divider from '../divider/divider';
import Info from '../info/info';
import Cancer from './components/cancer';
import Noehyeolgwan from './components/noehyeolgwan';
import Shimjang from './components/shimjang';

import * as styles from './keunbyeong.css';

const keunbyeongMockData = {
  additional_info:
    '3대 중증질환(암, 뇌혈관, 심장)은 발병률이 높고, 치료비 부담도 커요. 진단 즉시 목돈(진단비)이 지급돼 경제적 부담을 줄여줘요.',
};
const TEXT_TITLE = '큰병';
const TEST_REPORT_ID = '2281ccfc-1f10-4798-b3ad-6468b357b789';

const Keunbyeong = () => {
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: keunbyeongData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_KEUNBYEONG(
      TEST_REPORT_ID,
      accordionCategory,
    ),
    enabled: !!accordionCategory,
  });

  return (
    <div className={styles.dividerContainer}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentsContainer}>
        <Info
          description={keunbyeongMockData.additional_info}
          size="md"
          iconSize="2rem"
        />
        <Cancer onClick={handleSelectClick} data={keunbyeongData?.data} />
        <Noehyeolgwan onClick={handleSelectClick} data={keunbyeongData?.data} />
        <Shimjang onClick={handleSelectClick} data={keunbyeongData?.data} />
      </div>
    </div>
  );
};

export default Keunbyeong;
