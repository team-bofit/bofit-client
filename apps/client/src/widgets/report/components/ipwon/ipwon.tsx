import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { InsuranceIpwonReport } from '@shared/api/types/types';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './ipwon.css';

interface IpwonProps {
  sectionData?: components['schemas']['SectionData'];
  reportId: string;
}

const TEXT_TITLE = '입원';

const IPWON_COMPONENT = [
  { Component: Jilbyeong, key: ACCORDION_CATEGORY.IPWON.JILBYEONG },
  { Component: Sanghae, key: ACCORDION_CATEGORY.IPWON.SANGHAE },
] as const;

const Ipwon = ({ sectionData, reportId }: IpwonProps) => {
  const [cachedDataMap, setCachedDataMap] = useState<
    Partial<Record<string, InsuranceIpwonReport['data']>>
  >({});
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: ipwonData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_IPWON(reportId, accordionCategory),
    enabled: !!accordionCategory && !cachedDataMap[accordionCategory],
  });

  useEffect(() => {
    if (ipwonData?.data?.hyphenCase) {
      setCachedDataMap((prev) => ({
        ...prev,
        [ipwonData?.data?.hyphenCase ?? '']: ipwonData.data,
      }));
    }
  }, [ipwonData]);

  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentContainer}>
        <Info
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
        {IPWON_COMPONENT.map(({ Component, key }, index) => (
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

export default Ipwon;
