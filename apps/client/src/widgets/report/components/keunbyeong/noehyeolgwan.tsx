import { Alert } from '@bds/ui';

import { Accordion } from '../accordion/accordion';
import Graph from '../graph/graph';
import Info from '../info/info';
import Title from '../title/title';
import { noehyeolgwanData } from './mocks/keunbyeong-mocks';

import * as styles from './style.css';

const SECTION = [
  { title: '뇌출혈', key: 'hemorrhage' },
  { title: '뇌졸증', key: 'infarction' },
  { title: '기타 뇌혈관질환', key: 'other' },
] as const;

const Noehyeolgwan = () => {
  return (
    <div>
      <Accordion>
        <Accordion.Header type={noehyeolgwanData.coverageStatus}>
          뇌혈관질환
        </Accordion.Header>
        <Accordion.Panel>
          <Info
            description={noehyeolgwanData.additional_info}
            size="sm"
            iconSize="1.6rem"
          />
          <div className={styles.allgraphContainer}>
            {SECTION.map(({ title, key }) => {
              const diagnosisCoverage = noehyeolgwanData[key].diagnosis
                .productCoverage as number;
              const injuryCoverage = noehyeolgwanData[key].injury
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
                            average={
                              noehyeolgwanData[key].diagnosis.averageCoverage
                            }
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
                              highlight="진단비"
                            />
                          </div>
                        )}
                        {injuryCoverage !== 0 ? (
                          <Graph
                            detailItem="수술비"
                            average={
                              noehyeolgwanData[key].injury.averageCoverage
                            }
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
    </div>
  );
};

export default Noehyeolgwan;
