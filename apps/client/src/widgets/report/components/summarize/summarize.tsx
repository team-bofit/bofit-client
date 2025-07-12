import { Chip } from '@bds/ui';

import InsuranceSubtitle from '@shared/components/insurance-subtitle/insurance-subtitle';
import InsuranceTitle from '@shared/components/insurance-title/insurance-title';

import Maturity from '../maturity/maturity';
import Price from '../price/price';
import Recommend from '../recommend/recommend';

import * as styles from './summarize.css';

const reasonList = [
  '운전이 잦아 상해 위험 대비가 필요해요',
  '근골격계 이력으로 병원비 보장을 강화했어요',
  '월 7만 원 이하로 꼭 필요한 보장만 담았어요',
  '미혼인 점을 참고해 실제 치료비 중심으로 구성했어요',
];

const chipList = ['중대 질환 든든 보장', '합리적인 보험료'];

const userName = 'OO';
const company = 'OO보험사';
const insuranceName = 'OO보험';
const age = 100;
const price = 53479;

const Summarize = () => {
  return (
    <div className={styles.summarizeContainer}>
      <img
        className={styles.backgroundImage}
        src="./3d_shield.webp"
        alt="Sheild"
      />
      <div className={styles.contentContainer}>
        <div className={styles.topContainer}>
          <div className={styles.insuranceContainer}>
            <div className={styles.titleContainer}>
              <InsuranceSubtitle
                name={userName}
                type="report"
                fontColor="primary500"
                fontStyle="m_16"
              />
              <InsuranceTitle
                fontColor="gray900"
                fontStyle="eb_24"
                company={company}
                name={insuranceName}
              />
            </div>
            <div className={styles.chipContainer}>
              {chipList.map((label, index) => (
                <Chip
                  key={index}
                  label={`# ${label}`}
                  fontColor="gray"
                  backgroundColor="gray"
                  shape="rounded"
                />
              ))}
            </div>
          </div>
          <div className={styles.infoContainer}>
            <Maturity age={age} />
            <Price price={price} />
          </div>
        </div>
        <Recommend reasonList={reasonList} />
      </div>
    </div>
  );
};

export default Summarize;
