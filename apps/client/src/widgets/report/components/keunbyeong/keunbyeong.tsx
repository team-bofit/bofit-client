import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { InsuranceKeunbyeongReport } from '@shared/api/types/types';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

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

const KEUNBUEONG_COMPONENT = [
  { Component: Cancer, key: ACCORDION_CATEGORY.KEUNBYEONG.CANCER },
  { Component: Noehyeolgwan, key: ACCORDION_CATEGORY.KEUNBYEONG.NOEHYEOLGWAN },
  { Component: Shimjang, key: ACCORDION_CATEGORY.KEUNBYEONG.SHIMJANG },
] as const;

const Keunbyeong = ({ sectionData }: KeunbyeongProps) => {
  const [cachedDataMap, setCachedDataMap] = useState<
    Partial<Record<string, InsuranceKeunbyeongReport['data']>>
  >({});
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: keunbyeongData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_KEUNBYEONG(
      TEST_REPORT_ID,
      accordionCategory,
    ),
    enabled: !!accordionCategory && !cachedDataMap[accordionCategory],
  });

  useEffect(() => {
    if (keunbyeongData?.data?.hyphenCase) {
      setCachedDataMap((prev) => ({
        ...prev,
        [keunbyeongData?.data?.hyphenCase ?? '']: keunbyeongData.data,
      }));
    }
  }, [keunbyeongData]);

  return (
    <div className={styles.dividerContainer}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentsContainer}>
        <Info
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
        {KEUNBUEONG_COMPONENT.map(({ Component, key }, index) => (
          <Component
            key={key}
            target={sectionData?.statuses?.[index].target}
            status={sectionData?.statuses?.[index].status as StatusType}
            onClick={handleSelectClick}
            data={cachedDataMap[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default Keunbyeong;
