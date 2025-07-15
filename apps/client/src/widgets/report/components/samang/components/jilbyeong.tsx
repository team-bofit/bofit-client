import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

const jilbyeongData = {
  displayName: '질병사망',
  surgery: {
    productCoverage: 0,
    averageCoverage: 500,
  },
};

const Jilbyeong = () => {
  const hasCoverage = jilbyeongData.surgery.productCoverage == 0;
  return (
    <Accordion>
      <Accordion.Header type="강력">
        {jilbyeongData.displayName}
      </Accordion.Header>
      <Accordion.Panel>
        {hasCoverage ? (
          <Alert
            type="additional"
            iconName="info_warning"
            iconSize="2rem"
            alertHeader={ALERT.HEADER}
            alertContents={ALERT.CONTENTS}
            highlight={jilbyeongData.displayName}
          />
        ) : (
          <Graph
            average={jilbyeongData.surgery.averageCoverage}
            current={jilbyeongData.surgery.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Jilbyeong;
