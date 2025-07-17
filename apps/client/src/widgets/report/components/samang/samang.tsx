import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { InsuranceSamangReport } from '@shared/api/types/types';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './samang.css';

interface SamangProps {
  sectionData?: components['schemas']['SectionData'];
  reportId: string;
}

const TEXT_TITLE = '사망';

const SAMANG_COMPONENT = [
  { Component: Jilbyeong, key: ACCORDION_CATEGORY.SAMANG.JILBYEONG },
  { Component: Sanghae, key: ACCORDION_CATEGORY.SAMANG.SANGHAE },
] as const;

const Samang = ({ sectionData, reportId }: SamangProps) => {
  const [cachedDataMap, setCachedDataMap] = useState<
    Partial<Record<string, InsuranceSamangReport['data']>>
  >({});
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: samangData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_SAMANG(reportId, accordionCategory),
    enabled: !!accordionCategory && !cachedDataMap[accordionCategory],
  });

  useEffect(() => {
    if (samangData?.data?.hyphenCase) {
      setCachedDataMap((prev) => ({
        ...prev,
        [samangData?.data?.hyphenCase ?? '']: samangData.data,
      }));
    }
  }, [samangData]);

  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentContainer}>
        <Info
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
        {SAMANG_COMPONENT.map(({ Component, key }, index) => (
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

export default Samang;
