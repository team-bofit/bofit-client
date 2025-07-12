import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { cancerData } from '../mocks/keunbyeong-mocks';

import * as styles from './style.css';

export enum CancerProps {
  GENERAL = 'general',
  ATYPICAL = 'atypical',
}

const SECTION: { title: string; key: CancerProps }[] = [
  { title: '일반암', key: CancerProps.GENERAL },
  { title: '소액암', key: CancerProps.ATYPICAL },
];

const Cancer = () => {
  return (
    <Accordion>
      <Accordion.Header type="강력">암</Accordion.Header>
      <Accordion.Panel>
        <Info
          description={cancerData.additional_info}
          size="sm"
          iconSize="1.6rem"
        />
        <div className={styles.allgraphContainer}>
          {SECTION.map(({ title, key }) => {
            const { diagnosis, injury } = cancerData[key];

            const items = [
              {
                label: '진단비',
                coverage: diagnosis.productCoverage,
                average: diagnosis.averageCoverage,
                containerClass: styles.alertDiagnosisContainer,
              },
              {
                label: '수술비',
                coverage: injury.productCoverage,
                average: injury.averageCoverage,
                containerClass: styles.alertInjuryContainer,
              },
            ];

            const isAllZero = items.every((item) => item.coverage === 0);

            return (
              <div key={key} className={styles.graphContainer}>
                <Title category="subCategory" title={title} />
                <div className={styles.graphContentsContainer}>
                  {isAllZero ? (
                    <Alert
                      type="additional"
                      iconName="info_warning"
                      iconSize="2rem"
                      alertHeader={ALERT.HEADER}
                      alertContents={ALERT.CONTENTS}
                      highlight={title}
                    />
                  ) : (
                    items.map(({ label, coverage, average, containerClass }) =>
                      coverage !== 0 ? (
                        <Graph
                          key={label}
                          detailItem={label}
                          average={average}
                          current={coverage}
                        />
                      ) : (
                        <div key={label} className={containerClass}>
                          <Alert
                            type="additional"
                            iconName="info_warning"
                            iconSize="2rem"
                            alertHeader={ALERT.HEADER}
                            alertContents={ALERT.CONTENTS}
                            highlight={`${title} ${label}`}
                          />
                        </div>
                      ),
                    )
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
