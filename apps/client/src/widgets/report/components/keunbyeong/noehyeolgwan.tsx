import { Accordion } from '../accordion/accordion';
import Graph from '../graph/graph';
import Info from '../info/info';
import Title from '../title/title';

import * as styles from './noehyeolgwan.css';

const noehyeolgwanData = {
  coverageStatus: '충분',
  additional_info:
    '뇌출혈→뇌경색→뇌혈관질환 순으로 보장 범위가 넓어져요. 범위가 넓을수록 더 다양한 질환을 보장받을 수 있어요.',
  hemorrhage: {
    diagnosis: {
      productCoverage: 2000,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
  infarction: {
    diagnosis: {
      productCoverage: 2000,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
  other: {
    diagnosis: {
      productCoverage: 2000,
      averageCoverage: 2000,
    },
    injury: {
      productCoverage: 0,
      averageCoverage: 1000,
    },
  },
} as const;

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
              return (
                <div key={key} className={styles.graphContainer}>
                  <Title category="subCategory" title={title} />
                  <div className={styles.graphContentsContainer}>
                    <Graph
                      detailItem="진단비"
                      average={noehyeolgwanData[key].diagnosis.averageCoverage}
                      current={noehyeolgwanData[key].diagnosis.productCoverage}
                    />
                    <Graph
                      detailItem="수술비"
                      average={noehyeolgwanData[key].injury.averageCoverage}
                      current={noehyeolgwanData[key].injury.productCoverage}
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

export default Noehyeolgwan;
