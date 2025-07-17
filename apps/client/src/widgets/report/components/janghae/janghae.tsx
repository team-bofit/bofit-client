import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { InsuranceJanghaeReport } from '@shared/api/types/types';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './janhae.css';

interface JanghaeProps {
  sectionData?: components['schemas']['SectionData'];
}

const TEXT_TITLE = '장해';
const TEST_REPORT_ID = '2281ccfc-1f10-4798-b3ad-6468b357b789';

const JANGHAE_COMPONENT = [
  { Component: Jilbyeong, key: ACCORDION_CATEGORY.JANGHAE.JILBYEONG },
  { Component: Sanghae, key: ACCORDION_CATEGORY.JANGHAE.SANGHAE },
] as const;

const Janghae = ({ sectionData }: JanghaeProps) => {
  const [cachedDataMap, setCachedDataMap] = useState<
    Partial<Record<string, InsuranceJanghaeReport['data']>>
  >({});
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: janghaeData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_JANGHAE(
      TEST_REPORT_ID,
      accordionCategory,
    ),
    enabled: !!accordionCategory && !cachedDataMap[accordionCategory],
  });

  useEffect(() => {
    if (janghaeData?.data?.hyphenCase) {
      setCachedDataMap((prev) => ({
        ...prev,
        [janghaeData?.data?.hyphenCase ?? '']: janghaeData.data,
      }));
    }
  }, [janghaeData]);

  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentContainer}>
        <Info
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
        {JANGHAE_COMPONENT.map(({ Component, key }, index) => (
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

export default Janghae;
