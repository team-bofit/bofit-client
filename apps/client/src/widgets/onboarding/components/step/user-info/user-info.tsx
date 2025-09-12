import { Button } from '@bds/ui';

import { UserInfoStateProps } from '@widgets/onboarding/type/user-info.type';

import { components } from '@shared/types/schema';

import BasicInfoSection from '../../basic-info-section/basic-info-section';
import Title from '../../title/title';

import * as styles from './user-info.css';

const USER_TITLE = '기본 정보';
const USER_DESCRIPTION = '기본 정보를 입력해주세요';

interface UserInfoProps {
  value: UserInfoStateProps;
  onChange: (value: UserInfoStateProps) => void;
  jobs?: components['schemas']['JobResponses'];
  isNextEnabled: boolean;
  go: (step: number) => void;
}

const UserInfo = ({
  value,
  onChange,
  jobs,
  isNextEnabled,
  go,
}: UserInfoProps) => {
  return (
    <>
      <section className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <Title title={USER_TITLE} description={USER_DESCRIPTION} />
        </div>
        <BasicInfoSection state={value} onChange={onChange} jobs={jobs} />
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
