import { Chip } from '@bds/ui';

import InsuranceSubtitle from '@shared/components/insurance-subtitle/insurance-subtitle';
import InsuranceTitle from '@shared/components/insurance-title/insurance-title';

import Maturity from '../maturity/maturity';
import Price from '../price/price';
import Recommend from '../recommend/recommend';

import * as styles from './summarize.css';

const USERNAME = '지우';

interface SummarizeProps {
  reportInformation?: {
    name?: string;
    company?: string;
    premium?: number;
    maturityAge?: number;
  };
  reportRationale?: {
    reasons?: string[];
    keywordChips?: string[];
  };
}

const Summarize = ({ reportInformation, reportRationale }: SummarizeProps) => {
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
                company={reportInformation?.company}
                name={reportInformation?.name}
              />
            </div>
            <div className={styles.chipContainer}>
              {(reportRationale?.keywordChips ?? []).map((label, index) => (
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
            <Maturity age={reportInformation?.maturityAge ?? 0} />
            <Price price={reportInformation?.premium ?? 0} />
          </div>
        </section>
        <Recommend reasonList={reportRationale?.reasons ?? []} />
      </section>
    </section>
  );
};

export default Summarize;
