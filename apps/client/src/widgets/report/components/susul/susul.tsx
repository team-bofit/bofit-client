import { components } from '@shared/types/schema';

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

const COMPONENT = [
  { Component: Jilbyeong },
  { Component: JilbyeongClass },
  { Component: Sanghae },
  { Component: SanghaeClass },
] as const;

const Susul = ({ sectionData }: SusulProps) => {
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
              status={status as '충분' | '강력' | '부족'}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Susul;
