import { Alert } from '@bds/ui';

import { ACCORDION_CATEGORY } from '@widgets/report/constant/accordion-category-constant';
import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceIpwonReport } from '@shared/api/types/types';
import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface JilbyeongProps {
  onClick: (category: string) => void;
  data: InsuranceIpwonReport['data'];
  target?: string;
  status?: StatusType;
}

const Jilbyeong = ({ target, status, onClick, data }: JilbyeongProps) => {
  const hasCoverage = data?.diseaseDailyHospitalization?.productCoverage == 0;
  const hasData = !!data;

  return (
    <Accordion>
      <Accordion.Header
        type={status}
        onClick={onClick}
        accordionCategory={ACCORDION_CATEGORY.IPWON.JILBYEONG}
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

export default Jilbyeong;
