import { Button } from '@bds/ui';

import BasicInfoSection from '@widgets/onboarding/components/basic-info-section/basic-info-section';
import OnboardingTitle from '@widgets/onboarding/components/onboarding-title/onboarding-title';

import { components } from '@shared/types/schema';

import * as styles from './user-info.css';

const USER_TITLE = '기본 정보';
const USER_DESCRIPTION = '기본 정보를 입력해주세요';

interface UserInfoProps {
  jobs?: components['schemas']['JobResponses'];
  isNextEnabled: boolean;
  go: (step: number) => void;
}

const UserInfo = ({ jobs, isNextEnabled, go }: UserInfoProps) => {
  return (
    <>
      <section className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <OnboardingTitle title={USER_TITLE} description={USER_DESCRIPTION} />
        </div>
        <BasicInfoSection jobs={jobs} />
      </section>
      <div className={styles.nextButtonContainer}>
        <Button
          type="button"
          variant="primary"
          size="lg"
          disabled={!isNextEnabled}
          onClick={() => go(1)}
        >
          다음으로
        </Button>
      </div>
    </>
  );
};

export default UserInfo;
