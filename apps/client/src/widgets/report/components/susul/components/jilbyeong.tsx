import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

const jilbyeongData = {
  displayName: '질병수술비',
  surgery: {
    productCoverage: 0,
    averageCoverage: 50,
  },
};

const Jilbyeong = () => {
  const isZero = jilbyeongData.surgery.productCoverage == 0;
  return (
    <div>
      <Accordion>
        <Accordion.Header type="충분">
          {jilbyeongData.displayName}
        </Accordion.Header>
        <Accordion.Panel>
          {isZero ? (
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
    </div>
  );
};

export default Jilbyeong;
