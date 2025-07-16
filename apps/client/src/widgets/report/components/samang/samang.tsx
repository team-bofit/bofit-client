import { components } from '@shared/types/schema';

import Divider from '../divider/divider';
import Info from '../info/info';
import Jilbyeong from './components/jilbyeong';
import Sanghae from './components/sanghae';

import * as styles from './samang.css';

interface SamangProps {
  sectionData?: components['schemas']['SectionData'];
}

const COMPONENT = [{ Component: Jilbyeong }, { Component: Sanghae }] as const;

const TEXT_TITLE = '사망';

const Samang = ({ sectionData }: SamangProps) => {
  return (
    <div className={styles.container}>
      <Divider>{TEXT_TITLE}</Divider>
      <div className={styles.contentContainer}>
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
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Samang;
