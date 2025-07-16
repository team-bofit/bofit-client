import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { InsuranceKeunbyeongReport } from '@shared/api/types/types';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { useCoverage } from '../hooks/use-coverage';

import * as styles from './style.css';

interface ShimjangProps {
  onClick: (category: string) => void;
  data: InsuranceKeunbyeongReport['data'];
  target?: string;
  status?: '충분' | '강력' | '부족';
}

const Shimjang = ({ onClick, data, target, status }: ShimjangProps) => {
  const hasCoverage = useCoverage({ sections: data?.sections });

  return (
    <Accordion>
      <Accordion.Header
        type={status}
        onClick={onClick}
        accordionCategory="heart-disease"
      >
        {target}
      </Accordion.Header>
      <Accordion.Panel>
        <Info description={data?.additionalInfo} size="sm" iconSize="1.6rem" />
        <div className={styles.allgraphContainer}>
          {data?.sections?.map(({ displayName, diagnosis, injury }) => {
            if (!displayName) {
              return null;
            }
            return (
              <div key={displayName} className={styles.graphContainer}>
                <Title category="subCategory" title={displayName} />
                <div className={styles.graphContentsContainer}>
                  {hasCoverage[displayName].both ? (
                    <Alert
                      type="additional"
                      iconName="info_warning"
                      iconSize="2rem"
                      alertHeader={ALERT.HEADER}
                      alertContents={ALERT.CONTENTS}
                      highlight={displayName}
                    />
                  ) : (
                    <>
                      {hasCoverage[displayName].diagnosis ? (
                        <div className={styles.alertDiagnosisContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader={ALERT.HEADER}
                            alertContents={ALERT.JINDAN_CONTENTS}
                            highlight={displayName}
                          />
                        </div>
                      ) : (
                        <Graph
                          detailItem="진단비"
                          current={diagnosis?.productCoverage}
                          average={diagnosis?.averageCoverage}
                        />
                      )}

                      {hasCoverage[displayName].injury ? (
                        <div className={styles.alertInjuryContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader={ALERT.HEADER}
                            alertContents={ALERT.JINDAN_CONTENTS}
                            highlight={displayName}
                          />
                        </div>
                      ) : (
                        <Graph
                          detailItem="수술비"
                          current={injury?.productCoverage}
                          average={injury?.averageCoverage}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Accordion.Panel>
    </Accordion>
  );
};

export default Shimjang;
