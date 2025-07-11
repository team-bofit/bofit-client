import { Alert } from '@bds/ui';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { cancerData } from '../mocks/keunbyeong-mocks';

import * as styles from './style.css';

const SECTION = [
  { title: '일반암', key: 'general' },
  { title: '소액암', key: 'atypical' },
] as const;

const Cancer = () => {
  return (
    <Accordion>
      <Accordion.Header type={cancerData.coverageStatus}>암</Accordion.Header>
      <Accordion.Panel>
        <Info
          description={cancerData.additional_info}
          size="sm"
          iconSize="1.6rem"
        />
        <div className={styles.allgraphContainer}>
          {SECTION.map(({ title, key }) => {
            const diagnosisCoverage = cancerData[key].diagnosis
              .productCoverage as number;
            const injuryCoverage = cancerData[key].injury
              .productCoverage as number;

            const showAllAlert =
              diagnosisCoverage === 0 && injuryCoverage === 0;

            return (
              <div key={key} className={styles.graphContainer}>
                <Title category="subCategory" title={title} />
                <div className={styles.graphContentsContainer}>
                  {showAllAlert ? (
                    <Alert
                      type="additional"
                      iconName="info_warning"
                      iconSize="2rem"
                      alertHeader="참고하세요!"
                      alertContents="은 이 보험에 포함되지 않아요."
                      highlight={title}
                    />
                  ) : (
                    <>
                      {diagnosisCoverage !== 0 ? (
                        <Graph
                          detailItem="진단비"
                          average={cancerData[key].diagnosis.averageCoverage}
                          current={cancerData[key].diagnosis.productCoverage}
                        />
                      ) : (
                        <div className={styles.alertDiagnosisContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader="참고하세요!"
                            alertContents="는 이 보험에 포함되지 않아요."
                            highlight="진단비"
                          />
                        </div>
                      )}
                      {injuryCoverage !== 0 ? (
                        <Graph
                          detailItem="수술비"
                          average={cancerData[key].injury.averageCoverage}
                          current={cancerData[key].injury.productCoverage}
                        />
                      ) : (
                        <div className={styles.alertInjuryContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader="참고하세요!"
                            alertContents="는 이 보험에 포함되지 않아요."
                            highlight="수술비"
                          />
                        </div>
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

export default Cancer;
