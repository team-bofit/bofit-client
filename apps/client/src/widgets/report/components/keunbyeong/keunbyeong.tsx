import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { components } from '@shared/types/schema';

import Divider from '../divider/divider';
import Info from '../info/info';
import Cancer from './components/cancer';
import Noehyeolgwan from './components/noehyeolgwan';
import Shimjang from './components/shimjang';

import * as styles from './keunbyeong.css';

const TEXT_TITLE = '큰병';
const TEST_REPORT_ID = '2281ccfc-1f10-4798-b3ad-6468b357b789';

interface KeunbyeongProps {
  sectionData?: components['schemas']['SectionData'];
}

const COMPONENT = [
  { Component: Cancer },
  { Component: Noehyeolgwan },
  { Component: Shimjang },
] as const;

const Keunbyeong = ({ sectionData }: KeunbyeongProps) => {
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
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
        {sectionData?.statuses?.map(({ target, status }, index) => {
          const Component = COMPONENT[index]?.Component;
          return Component ? (
            <Component
              target={target}
              status={status as '충분' | '강력' | '부족'}
              onClick={handleSelectClick}
              data={keunbyeongData?.data}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Keunbyeong;
