import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceIpwonReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface SanghaeProps {
  onClick: (category: string) => void;
  data: InsuranceIpwonReport['data'];
  target?: string;
  status?: StatusType;
}

const Sanghae = ({ target, status, onClick, data }: SanghaeProps) => {
  const hasCoverage = data?.diseaseDailyHospitalization?.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header
        type={status}
        onClick={onClick}
        accordionCategory={ACCORDION_CATEGORY.IPWON.SANGHAE}
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
            alertContents={ALERT.EUN_CONTENTS}
            highlight={target}
          />
        ) : (
          <Graph
            average={data?.diseaseDailyHospitalization?.averageCoverage}
            current={data?.diseaseDailyHospitalization?.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Sanghae;
