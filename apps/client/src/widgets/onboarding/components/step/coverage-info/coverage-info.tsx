import { CoverageItemProps } from '@widgets/onboarding/type/user-info.type';

import HorizontalButton from '../../horizontal-button/horizontal-button';
import Title from '../../title/title';

import * as styles from './coverage-info.css';

const COVERAGE_TITLE = '보장상황';
const COVERAGE_DESCRIPTION = `어떤 일이 생겼을 때\n보장받고 싶으신가요?`;
const COVERAGE_CAPTION = '최대 3순위까지 선택할 수 있어요.';

interface CoverageInfoProps {
  onLimitExceed?: () => void;
  selectedIndices: number[];
  onSelectionChange: (selectedIndices: number[]) => void;
  coverageItems: CoverageItemProps[];
}

const CoverageInfo = ({
  onLimitExceed,
  selectedIndices,
  onSelectionChange,
  coverageItems,
}: CoverageInfoProps) => {
  return (
    <section className={styles.coverageContainer}>
      <div className={styles.titleContainer}>
        <Title
          title={COVERAGE_TITLE}
          description={COVERAGE_DESCRIPTION}
          caption={COVERAGE_CAPTION}
        />
      </div>
      <HorizontalButton
        selectedIndices={selectedIndices}
        onSelectionChange={onSelectionChange}
        onLimitExceed={onLimitExceed}
        coverageItems={coverageItems}
      />
    </section>
  );
};

export default CoverageInfo;
