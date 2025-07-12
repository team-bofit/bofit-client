import { Alert } from '@bds/ui';

import { ALERT } from '@widgets/report/constant/alert-content';

import { Accordion } from '../../accordion/accordion';
import Graph from '../../graph/graph';
import Info from '../../info/info';
import Title from '../../title/title';
import { noehyeolgwanData } from '../mocks/keunbyeong-mocks';

import * as styles from './style.css';

export enum NoehyelgwanProps {
  HEMORRHAGE = 'hemorrhage',
  INFARCTION = 'infarction',
  OTHER = 'other',
}

const SECTION: { title: string; key: NoehyelgwanProps }[] = [
  { title: '뇌출혈', key: NoehyelgwanProps.HEMORRHAGE },
  { title: '뇌졸중', key: NoehyelgwanProps.INFARCTION },
  { title: '기타 뇌혈관질환', key: NoehyelgwanProps.OTHER },
];

const Noehyeolgwan = () => {
  return (
    <Accordion>
      <Accordion.Header type="강력">뇌혈관질환</Accordion.Header>
      <Accordion.Panel>
        <Info
          description={noehyeolgwanData.additional_info}
          size="sm"
          iconSize="1.6rem"
        />
        <div className={styles.allgraphContainer}>
          {SECTION.map(({ title, key }) => {
            const { diagnosis, injury } = noehyeolgwanData[key];

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

export default Noehyeolgwan;
