import { JobItem } from '@widgets/onboarding/type/user-info.type';

import BasicInfoSection from '../../basic-info-section/basic-info-section';
import Title from '../../title/title';

import * as styles from './user-info.css';

const USER_TITLE = '기본 정보';
const USER_DESCRIPTION = '기본 정보를 입력해주세요';

interface State {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: '남성' | '여성';
  occupation: string;
  isMarried: boolean | null;
  hasChild: boolean | null;
  isDriver: boolean | null;
}

interface UserInfoProps {
  value: State;
  onChange: (value: State) => void;
  jobs: JobItem[];
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
