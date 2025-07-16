import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface SanghaeProps {
  target?: string;
  status?: '충분' | '강력' | '부족';
}

//mock 데이터
const janghaeData = {
  surgery: {
    productCoverage: 30,
    averageCoverage: 50,
  },
};

const Sanghae = ({ target, status }: SanghaeProps) => {
  const hasCoverage = janghaeData.surgery.productCoverage == 0;
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
            average={janghaeData.surgery.averageCoverage}
            current={janghaeData.surgery.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Sanghae;
