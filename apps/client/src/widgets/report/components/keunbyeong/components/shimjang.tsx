import { Alert } from '@bds/ui';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { shimjangData } from '../mocks/keunbyeong-mocks';

import * as styles from './style.css';

const SECTION = [
  { title: '급성 심근경색', key: 'acuteMyocardialInfarction' },
  { title: '허혈성 심장질환', key: 'ischemic' },
  { title: '확대 심장질환', key: 'extended' },
  { title: '부정맥, 심부전', key: 'arrhythmia' },
] as const;

const Shimjang = () => {
  return (
    <Accordion>
      <Accordion.Header type="강력"> 심장질환</Accordion.Header>
      <Accordion.Panel>
        <Info
          description={shimjangData.additional_info}
          size="sm"
          iconSize="1.6rem"
        />
        <div className={styles.allgraphContainer}>
          {SECTION.map(({ title, key }) => {
            const diagnosisCoverage =
              shimjangData[key].diagnosis.productCoverage;
            const injuryCoverage = shimjangData[key].injury.productCoverage;
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
                          average={shimjangData[key].diagnosis.averageCoverage}
                          current={diagnosisCoverage}
                        />
                      ) : (
                        <div className={styles.alertDiagnosisContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader="참고하세요!"
                            alertContents="는 이 보험에 포함되지 않아요."
                            highlight={`진단비`}
                          />
                        </div>
                      )}

                      {injuryCoverage !== 0 ? (
                        <Graph
                          detailItem="수술비"
                          average={shimjangData[key].injury.averageCoverage}
                          current={injuryCoverage}
                        />
                      ) : (
                        <div className={styles.alertInjuryContainer}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader="참고하세요!"
                            alertContents="는 이 보험에 포함되지 않아요."
                            highlight={`수술비`}
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

export default Shimjang;
