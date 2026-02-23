import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { InfoBox } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { InsuranceSusulReport } from '@shared/api/types/types';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

import Divider from '../divider/divider';
import Jilbyeong from './components/jilbyeong';
import JilbyeongClass from './components/jilbyeong-class';
import Sanghae from './components/sanghae';
import SanghaeClass from './components/sanghae-class';

import * as styles from './susul.css';

interface SusulProps {
  sectionData?: components['schemas']['SectionData'];
  reportId: string;
}

const SUSUL_COMPONENTS = [
  {
    Component: Jilbyeong,
    key: ACCORDION_CATEGORY.SUSUL.JILBYEONG,
  },
  {
    Component: JilbyeongClass,
    key: ACCORDION_CATEGORY.SUSUL.JILBYEONG_CLASS,
  },
  {
    Component: Sanghae,
    key: ACCORDION_CATEGORY.SUSUL.SANGHEA,
  },
  {
    Component: SanghaeClass,
    key: ACCORDION_CATEGORY.SUSUL.SANGHAE_CLASS,
  },
];

const Susul = ({ sectionData, reportId }: SusulProps) => {
  const [cachedDataMap, setCachedDataMap] = useState<
    Partial<Record<string, InsuranceSusulReport['data']>>
  >({});
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: susulData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_SUSUL(reportId, accordionCategory),
    enabled: !!accordionCategory && !cachedDataMap[accordionCategory],
  });

  useEffect(() => {
    if (susulData?.data?.hyphenCase) {
      setCachedDataMap((prev) => ({
        ...prev,
        [susulData?.data?.hyphenCase ?? '']: susulData.data,
      }));
    }
  }, [susulData]);

  return (
    <div className={styles.container}>
      <Divider>수술</Divider>
      <div className={styles.infoContainer}>
        <InfoBox
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
      </div>
      <div className={styles.contentsContainer}>
        {SUSUL_COMPONENTS.map(({ Component, key }, index) => (
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

export default Susul;
