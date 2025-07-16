import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { StatusType } from '@shared/types/type';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface SanghaeProps {
  target?: string;
  status?: StatusType;
}

//mock 데이터
const sanghaeData = {
  surgery: {
    productCoverage: 0,
    averageCoverage: 50,
  },
};

const Sanghae = ({ target, status }: SanghaeProps) => {
  const hasCoverage = sanghaeData.surgery.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header type={status}>{target}</Accordion.Header>
      <Accordion.Panel>
        {hasCoverage ? (
          <Alert
            type="additional"
            iconName="info_warning"
            iconSize="2rem"
            alertHeader={ALERT.HEADER}
            alertContents={ALERT.CONTENTS}
            highlight={target}
          />
        ) : (
          <Graph
            average={sanghaeData.surgery.averageCoverage}
            current={sanghaeData.surgery.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Sanghae;
