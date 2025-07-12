import { Chip } from '@bds/ui';

import InsuranceSubtitle from '@shared/components/insurance-subtitle/insurance-subtitle';
import InsuranceTitle from '@shared/components/insurance-title/insurance-title';

import Maturity from '../maturity/maturity';
import Price from '../price/price';
import Recommend from '../recommend/recommend';

import * as styles from './summarize.css';

const REASON_LIST = [
  '운전이 잦아 상해 위험 대비가 필요해요',
  '근골격계 이력으로 병원비 보장을 강화했어요',
  '월 7만 원 이하로 꼭 필요한 보장만 담았어요',
  '미혼인 점을 참고해 실제 치료비 중심으로 구성했어요',
];

const CHIP_LIST = ['중대 질환 든든 보장', '합리적인 보험료'];

const USERNAME = 'OO';
const COMPANY = 'OO보험사';
const INSURANCE_NAME = 'OO보험';
const AGE = 100;
const PRICE = 53479;

const Summarize = () => {
  return (
    <section className={styles.summarizeContainer}>
      <img
        className={styles.backgroundImage}
        src="./3d_shield.webp"
        alt="Sheild"
      />
      <section className={styles.contentContainer}>
        <section className={styles.topContainer}>
          <div className={styles.insuranceContainer}>
            <div className={styles.titleContainer}>
              <InsuranceSubtitle
                name={USERNAME}
                type="report"
                fontColor="primary500"
                fontStyle="m_16"
              />
              <InsuranceTitle
                fontColor="gray900"
                fontStyle="eb_24"
                company={COMPANY}
                name={INSURANCE_NAME}
              />
            </div>
            <div className={styles.chipContainer}>
              {CHIP_LIST.map((label, index) => (
                <Chip
                  key={index}
                  label={`# ${label}`}
                  fontColor="gray"
                  backgroundColor="gray"
                  shape="rounded"
                  outline={true}
                />
              ))}
            </div>
          </div>
          <div className={styles.infoContainer}>
            <Maturity age={AGE} />
            <Price price={PRICE} />
          </div>
        </section>
        <Recommend reasonList={REASON_LIST} />
      </section>
    </section>
  );
};

export default Summarize;
