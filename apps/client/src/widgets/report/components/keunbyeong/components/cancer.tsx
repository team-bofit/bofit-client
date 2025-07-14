import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { useCoverage } from '../hooks/use-coverage';
import { cancerData } from '../mocks/keunbyeong-mocks';

import * as styles from './style.css';
const Cancer = () => {
  const hasCoverage = useCoverage(cancerData.sections);

  return (
    <Accordion>
      <Accordion.Header type="강력">암</Accordion.Header>
      <Accordion.Panel>
        <Info
          description={cancerData.additionalInfo}
          size="sm"
          iconSize="1.6rem"
        />
        <div className={styles.allgraphContainer}>
          {cancerData.sections.map(({ displayName, diagnosis, injury }) => (
            <div key={displayName} className={styles.graphContainer}>
              <Title category="subCategory" title={displayName} />
              <div className={styles.graphContentsContainer}>
                {hasCoverage[displayName].both ? (
                  <Alert
                    type="additional"
                    iconName="info_warning"
                    iconSize="2rem"
                    alertHeader={ALERT.HEADER}
                    alertContents="은 이 보험에 포함되지 않아요."
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
                          alertContents="진단비는 이 보험에 포함되지 않아요."
                          highlight={displayName}
                        />
                      </div>
                    ) : (
                      <Graph
                        detailItem="진단비"
                        current={diagnosis.productCoverage}
                        average={diagnosis.averageCoverage}
                      />
                    )}

                    {hasCoverage[displayName].injury ? (
                      <div className={styles.alertInjuryContainer}>
                        <Alert
                          type="additional"
                          iconName="info_warning"
                          iconSize="2rem"
                          alertHeader={ALERT.HEADER}
                          alertContents="수술비는 이 보험에 포함되지 않아요."
                          highlight={displayName}
                        />
                      </div>
                    ) : (
                      <Graph
                        detailItem="수술비"
                        current={injury.productCoverage}
                        average={injury.averageCoverage}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Accordion.Panel>
    </Accordion>
  );
};

export default Cancer;
