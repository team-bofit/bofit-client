import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

const sanghaeData = {
  displayName: '상해사망',
  surgery: {
    productCoverage: 0,
    averageCoverage: 50,
  },
};

const Sanghae = () => {
  const hasCoverage = sanghaeData.surgery.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header type="강력">{sanghaeData.displayName}</Accordion.Header>
      <Accordion.Panel>
        {hasCoverage ? (
          <Alert
            type="additional"
            iconName="info_warning"
            iconSize="2rem"
            alertHeader={ALERT.HEADER}
            alertContents={ALERT.CONTENTS}
            highlight={sanghaeData.displayName}
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
