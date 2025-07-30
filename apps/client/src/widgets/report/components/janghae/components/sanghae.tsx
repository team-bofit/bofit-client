import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceJanghaeReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface SanghaeProps {
  onClick: (category: string) => void;
  data: InsuranceJanghaeReport['data'];
  target?: string;
  status?: StatusType;
}

const Sanghae = ({ onClick, data, target, status }: SanghaeProps) => {
  const hasCoverage = data?.coverage?.productCoverage == 0;
  const hasData = !!data;
  return (
    <Accordion>
      <Accordion.Header
        type={status}
        onClick={onClick}
        accordionCategory={ACCORDION_CATEGORY.JANGHAE.SANGHAE}
      >
        {target}
      </Accordion.Header>
      <Accordion.Panel hasData={hasData}>
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

export default Sanghae;
