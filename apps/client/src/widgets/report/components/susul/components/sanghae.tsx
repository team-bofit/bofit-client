import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

const sanghaeData = {
  displayName: '상해수술비',
  surgery: {
    productCoverage: 60,
    averageCoverage: 50,
  },
};

const Sanghae = () => {
  const isZero = sanghaeData.surgery.productCoverage == 0;
  return (
    <div>
      <Accordion>
        <Accordion.Header type="충분">
          {sanghaeData.displayName}
        </Accordion.Header>
        <Accordion.Panel>
          {isZero ? (
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
    </div>
  );
};

export default Sanghae;
