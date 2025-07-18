import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceJanghaeReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface JilbyeongProps {
  onClick: (category: string) => void;
  data: InsuranceJanghaeReport['data'];
  target?: string;
  status?: StatusType;
}

const Jilbyeong = ({ onClick, data, target, status }: JilbyeongProps) => {
  const hasCoverage = data?.coverage?.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header
        type={status}
        onClick={onClick}
        accordionCategory={ACCORDION_CATEGORY.JANGHAE.JILBYEONG}
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
            average={data?.coverage?.averageCoverage}
            current={data?.coverage?.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Jilbyeong;
