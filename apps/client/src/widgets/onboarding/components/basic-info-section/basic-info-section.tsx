import { Button, Input } from '@bds/ui';

import {
  JobItem,
  UserInfoState,
} from '@widgets/onboarding/type/user-info.type';

import DropDown from '../dropdown/dropdown';

import * as styles from './basic-info-section.css';

const LABEL = {
  NAME: '이름',
  BIRTHDATE: '생년월일',
  GENDER: '성별',
  OCCUPATION: '어떤 직업에 종사하고 계신가요?',
  MARRIED: '기혼자이신가요?',
  CHILD: '자녀가 있으신가요?',
  DRIVER: '운전하시나요?',
};

const OPTION = {
  YES: '예',
  NO: '아니오',
  MALE: '남성',
  FEMALE: '여성',
  NAME_PLACEHOLDER: '이름을 작성해주세요.',
  YEAR: '년',
  MONTH: '월',
  DAY: '일',
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_BIRTH_YEAR'; payload: string }
  | { type: 'SET_BIRTH_MONTH'; payload: string }
  | { type: 'SET_BIRTH_DAY'; payload: string }
  | { type: 'SET_GENDER'; payload: '남성' | '여성' }
  | { type: 'SET_OCCUPATION'; payload: string }
  | { type: 'SET_IS_MARRIED'; payload: boolean }
  | { type: 'SET_HAS_CHILD'; payload: boolean }
  | { type: 'SET_IS_DRIVER'; payload: boolean };

interface BasicInfoSectionProps {
  state: UserInfoState;
  onChange: (state: UserInfoState) => void;
  jobs: JobItem[];
}

const BasicInfoSection = ({ state, onChange, jobs }: BasicInfoSectionProps) => {
  const typeToKey = (type: Action['type']) => {
    switch (type) {
      case 'SET_NAME':
        return 'name';
      case 'SET_BIRTH_YEAR':
        return 'birthYear';
      case 'SET_BIRTH_MONTH':
        return 'birthMonth';
      case 'SET_BIRTH_DAY':
        return 'birthDay';
      case 'SET_GENDER':
        return 'gender';
      case 'SET_OCCUPATION':
        return 'occupation';
      case 'SET_IS_MARRIED':
        return 'isMarried';
      case 'SET_HAS_CHILD':
        return 'hasChild';
      case 'SET_IS_DRIVER':
        return 'isDriver';
      default:
        return '';
    }
  };

  const handleChange =
    (type: Action['type']) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...state, [typeToKey(type)]: e.target.value });
    };

  const handleClick =
    <T extends Action['payload']>(type: Action['type'], payload: T) =>
    () => {
      onChange({ ...state, [typeToKey(type)]: payload });
    };

  const handleOccupationChange = (selected: string) => {
    onChange({ ...state, occupation: selected });
  };

  const yearInputId = 'birth-year-input';
  const monthInputId = 'birth-month-input';
  const dayInputId = 'birth-day-input';

  const handleBirthChange =
    (type: Action['type'], maxLength: number, nextInputId?: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNumber = e.target.value.replace(/\D/g, '');
      if (onlyNumber.length <= maxLength) {
        onChange({ ...state, [typeToKey(type)]: onlyNumber });
        if (onlyNumber.length === maxLength && nextInputId) {
          const nextInput = document.getElementById(nextInputId);
          if (nextInput) {
            (nextInput as HTMLInputElement).focus();
          }
        }
      }
    };

  return (
    <section className={styles.basicContainer}>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.NAME}</p>
        <Input
          value={state.name}
          onChange={handleChange('SET_NAME')}
          bgColor="background"
          placeholder={OPTION.NAME_PLACEHOLDER}
        />
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.BIRTHDATE}</p>
        <div className={styles.birthdateContainer}>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Input
                value={state.birthYear}
                onChange={handleBirthChange('SET_BIRTH_YEAR', 4, monthInputId)}
                placeholder="YYYY"
                maxLength={4}
                bgColor="background"
                id={yearInputId}
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.YEAR}</span>
          </div>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Input
                value={state.birthMonth}
                onChange={handleBirthChange('SET_BIRTH_MONTH', 2, dayInputId)}
                placeholder="MM"
                maxLength={2}
                bgColor="background"
                id={monthInputId}
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.MONTH}</span>
          </div>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Input
                value={state.birthDay}
                onChange={handleBirthChange('SET_BIRTH_DAY', 2)}
                placeholder="DD"
                maxLength={2}
                bgColor="background"
                id={dayInputId}
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.DAY}</span>
          </div>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.GENDER}</p>
        <div className={styles.buttonContainer}>
          <Button
            size="lg"
            variant={state.gender === OPTION.MALE ? 'selected' : 'unselected'}
            onClick={handleClick('SET_GENDER', '남성')}
          >
            {OPTION.MALE}
          </Button>
          <Button
            size="lg"
            variant={state.gender === OPTION.FEMALE ? 'selected' : 'unselected'}
            onClick={handleClick('SET_GENDER', '여성')}
          >
            {OPTION.FEMALE}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.OCCUPATION}</p>
        <DropDown
          selected={state.occupation || null}
          onSelect={handleOccupationChange}
          jobs={jobs}
        />
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.MARRIED}</p>
        <div className={styles.buttonContainer}>
          <Button
            size="lg"
            variant={state.isMarried === true ? 'selected' : 'unselected'}
            onClick={handleClick('SET_IS_MARRIED', true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.isMarried === false ? 'selected' : 'unselected'}
            onClick={handleClick('SET_IS_MARRIED', false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.CHILD}</p>
        <div className={styles.buttonContainer}>
          <Button
            size="lg"
            variant={state.hasChild === true ? 'selected' : 'unselected'}
            onClick={handleClick('SET_HAS_CHILD', true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.hasChild === false ? 'selected' : 'unselected'}
            onClick={handleClick('SET_HAS_CHILD', false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.DRIVER}</p>
        <div className={styles.buttonContainer}>
          <Button
            size="lg"
            variant={state.isDriver === true ? 'selected' : 'unselected'}
            onClick={handleClick('SET_IS_DRIVER', true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.isDriver === false ? 'selected' : 'unselected'}
            onClick={handleClick('SET_IS_DRIVER', false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
