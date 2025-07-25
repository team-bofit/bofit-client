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
}

const UserInfo = ({ value, onChange, jobs }: UserInfoProps) => {
  return (
    <section className={styles.infoContainer}>
      <div className={styles.titleContainer}>
        <Title title={USER_TITLE} description={USER_DESCRIPTION} />
      </div>
      <BasicInfoSection state={value} onChange={onChange} jobs={jobs} />
    </section>
  );
};

export default UserInfo;
