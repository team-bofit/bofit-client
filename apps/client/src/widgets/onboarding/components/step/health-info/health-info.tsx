import { Button } from '@bds/ui';

import { components } from '@shared/types/schema';

import GridButtonSection from '../../grid-button-section/grid-button-section';
import Title from '../../title/title';

import * as styles from './health-info.css';

const HEALTH_TITLE = '건강사항';
const HEALTH_DESCRIPTION = `더 정확한 추천을 위해\n건강에 대해 간단히 여쭤볼게요!`;
const FIRST_QUESTION = `최근 5년 이내 병원에서 다음 질병을\n진단 또는 치료받은 적 있나요?`;
const SECOND_QUESTION = `부모님이나 형제자매 중 아래 질병을 진단\n받으신 분이 있나요?`;
const COMMON_DESCRIPTION = '정확한 추천을 위해 모두 선택해주세요.';

interface HealthInfoProps {
  onFirstChange: (val: string[]) => void;
  onSecondChange: (val: string[]) => void;
  firstSelected: string[];
  secondSelected: string[];
  diagnosedDiseases?: components['schemas']['DiagnosedDiseaseResponses'];
  isNextEnabled: boolean;
}

const HealthInfo = ({
  onFirstChange,
  onSecondChange,
  firstSelected,
  secondSelected,
  diagnosedDiseases,
  isNextEnabled,
}: HealthInfoProps) => {
  return (
    <>
      <section className={styles.healthContainer}>
        <div className={styles.titleContainer}>
          <Title title={HEALTH_TITLE} description={HEALTH_DESCRIPTION} />
        </div>
        <div className={styles.buttonContainer}>
          <GridButtonSection
            question={FIRST_QUESTION}
            description={COMMON_DESCRIPTION}
            onChange={onFirstChange}
            selected={firstSelected}
            diagnosedDiseases={diagnosedDiseases}
          />
          <GridButtonSection
            question={SECOND_QUESTION}
            description={COMMON_DESCRIPTION}
            onChange={onSecondChange}
            selected={secondSelected}
            diagnosedDiseases={diagnosedDiseases}
          />
        </div>
      </section>
      <div className={styles.nextButtonContainer}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isNextEnabled}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};

export default HealthInfo;
