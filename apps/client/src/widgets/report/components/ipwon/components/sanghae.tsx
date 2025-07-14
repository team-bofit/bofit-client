import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

const janghaeData = {
  displayName: '상해입원일당(1일이상)',
  surgery: {
    productCoverage: 30,
    averageCoverage: 50,
  },
};

const Sanghae = () => {
  const hasCoverage = janghaeData.surgery.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header type="강력">{janghaeData.displayName}</Accordion.Header>
      <Accordion.Panel>
        {hasCoverage ? (
          <Alert
            type="additional"
            iconName="info_warning"
            iconSize="2rem"
            alertHeader={ALERT.HEADER}
            alertContents={ALERT.CONTENTS}
            highlight={janghaeData.displayName}
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
