import { Accordion } from '../accordion/accordion';
import Graph from '../graph/graph';
import Info from '../info/info';
import Title from '../title/title';

import * as styles from './cancer.css';

const cancerData = {
  coverageStatus: '강력',
  additional_info:
    '일반암(위암, 폐암 등)과 소액암(갑상선암, 전립선암 등)으로 나뉘며, 치료비가 저렴하고 완치가 쉽기 때문에 보장금액이 낮게 설정돼요.',
  general: {
    diagnosis: {
      productCoverage: 1000,
      averageCoverage: 5000,
    },
    injury: {
      productCoverage: 7000,
      averageCoverage: 1000,
    },
  },
  atypical: {
    diagnosis: {
      productCoverage: 200,
      averageCoverage: 1000,
    },
    injury: {
      productCoverage: 2000,
      averageCoverage: 1000,
    },
  },
} as const;

const SECTION = [
  { title: '일반암', key: 'general' },
  { title: '소액암', key: 'atypical' },
] as const;

const Cancer = () => {
  return (
    <div>
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
              return (
                <div key={key} className={styles.graphContainer}>
                  <Title category="subCategory" title={title} />
                  <div className={styles.graphContentsContainer}>
                    <Graph
                      detailItem="진단비"
                      average={cancerData[key].diagnosis.averageCoverage}
                      current={cancerData[key].diagnosis.productCoverage}
                    />
                    <Graph
                      detailItem="수술비"
                      average={cancerData[key].injury.averageCoverage}
                      current={cancerData[key].injury.productCoverage}
                    />
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

export default Cancer;
