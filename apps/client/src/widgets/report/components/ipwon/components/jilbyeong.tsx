import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';

interface JilbyeongProps {
  target?: string;
  status?: '충분' | '강력' | '부족';
}

//mock 데이터
const jilbyeongData = {
  surgery: {
    productCoverage: 1000,
    averageCoverage: 500,
  },
};

const Jilbyeong = ({ target, status }: JilbyeongProps) => {
  const hasCoverage = jilbyeongData.surgery.productCoverage == 0;
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
            average={jilbyeongData.surgery.averageCoverage}
            current={jilbyeongData.surgery.productCoverage}
          />
        )}
      </Accordion.Panel>
    </Accordion>
  );
};

export default Jilbyeong;
