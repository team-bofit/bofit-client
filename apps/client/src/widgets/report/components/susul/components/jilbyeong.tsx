import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceSusulReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface JilbyeongProps {
  onClick: (category: string) => void;
  data: InsuranceSusulReport['data'];
  target?: string;
  status?: StatusType;
}

const Jilbyeong = ({ target, status, onClick, data }: JilbyeongProps) => {
  const hasCoverage = data?.surgery?.productCoverage == 0;

  return (
    <>
      <Accordion>
        <Accordion.Header
          type={status}
          onClick={onClick}
          accordionCategory={ACCORDION_CATEGORY.SUSUL.JILBYEONG}
        >
          {target}
        </Accordion.Header>
        <Accordion.Panel>
          {hasCoverage ? (
            <Alert
              type="additional"
              iconName="info_warning"
              iconSize="2rem"
              alertHeader={ALERT.HEADER}
              alertContents={ALERT.NEUN_CONTENTS}
              highlight={target}
            />
          ) : (
            <Graph
              average={data?.surgery?.averageCoverage}
              current={data?.surgery?.productCoverage}
            />
          )}
        </Accordion.Panel>
      </Accordion>
    </>
  );
};

export default Jilbyeong;
