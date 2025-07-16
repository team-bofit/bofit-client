import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { INSURANCE_QUERY_OPTIONS } from '@shared/api/domain/report/queries';
import { components } from '@shared/types/schema';
import { StatusType } from '@shared/types/type';

import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import JilbyeongClass from './components/jilbyeong-class';
import Sanghae from './components/sanghae';
import SanghaeClass from './components/sanghae-class';

import * as styles from './susul.css';

interface SusulProps {
  sectionData?: components['schemas']['SectionData'];
}

const TEXT_TITLE = '수술';
const TEST_REPORT_ID = '2281ccfc-1f10-4798-b3ad-6468b357b789';

const COMPONENT = [
  { Component: Jilbyeong },
  { Component: JilbyeongClass },
  { Component: Sanghae },
  { Component: SanghaeClass },
] as const;

const Susul = ({ sectionData }: SusulProps) => {
  const [accordionCategory, setAccordionCategory] = useState('');

  const handleSelectClick = (category: string) => {
    setAccordionCategory(category);
  };

  const { data: susulData } = useQuery({
    ...INSURANCE_QUERY_OPTIONS.REPORT_SUSUL(TEST_REPORT_ID, accordionCategory),
    enabled: !!accordionCategory,
  });

  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.infoContainer}>
        <Info
          description={sectionData?.additionalInfo}
          size="md"
          iconSize="2rem"
        />
      </div>
      <div className={styles.contentsContainer}>
        {sectionData?.statuses?.map(({ target, status }, index) => {
          const Component = COMPONENT[index]?.Component;
          return Component ? (
            <Component
              target={target}
              status={status as StatusType}
              onClick={handleSelectClick}
              data={susulData?.data}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Susul;
