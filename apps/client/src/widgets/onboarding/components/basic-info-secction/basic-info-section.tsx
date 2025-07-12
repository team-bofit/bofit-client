import { useReducer } from 'react';

import { Button, Input } from '@bds/ui';

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

type State = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: '남성' | '여성' | null;
  isMarried: boolean | null;
  hasChild: boolean | null;
  isDriver: boolean | null;
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_BIRTH_YEAR'; payload: string }
  | { type: 'SET_BIRTH_MONTH'; payload: string }
  | { type: 'SET_BIRTH_DAY'; payload: string }
  | { type: 'SET_GENDER'; payload: '남성' | '여성' }
  | { type: 'SET_IS_MARRIED'; payload: boolean }
  | { type: 'SET_HAS_CHILD'; payload: boolean }
  | { type: 'SET_IS_DRIVER'; payload: boolean };

const initialState: State = {
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  gender: '여성',
  isMarried: false,
  hasChild: false,
  isDriver: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_BIRTH_YEAR':
      return { ...state, birthYear: action.payload };
    case 'SET_BIRTH_MONTH':
      return { ...state, birthMonth: action.payload };
    case 'SET_BIRTH_DAY':
      return { ...state, birthDay: action.payload };
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_IS_MARRIED':
      return { ...state, isMarried: action.payload };
    case 'SET_HAS_CHILD':
      return { ...state, hasChild: action.payload };
    case 'SET_IS_DRIVER':
      return { ...state, isDriver: action.payload };
    default:
      return state;
  }
};

const BasicInfoSection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className={styles.basicContainer}>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.NAME}</p>
        <Input
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'SET_NAME', payload: e.target.value })
          }
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
                onChange={(e) =>
                  dispatch({ type: 'SET_BIRTH_YEAR', payload: e.target.value })
                }
                placeholder="YYYY"
                maxLength={4}
                bgColor="background"
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.YEAR}</span>
          </div>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Input
                value={state.birthMonth}
                onChange={(e) =>
                  dispatch({ type: 'SET_BIRTH_MONTH', payload: e.target.value })
                }
                placeholder="MM"
                maxLength={2}
                bgColor="background"
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.MONTH}</span>
          </div>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Input
                value={state.birthDay}
                onChange={(e) =>
                  dispatch({ type: 'SET_BIRTH_DAY', payload: e.target.value })
                }
                placeholder="DD"
                maxLength={2}
                bgColor="background"
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
            onClick={() => dispatch({ type: 'SET_GENDER', payload: '남성' })}
          >
            {OPTION.MALE}
          </Button>
          <Button
            size="lg"
            variant={state.gender === OPTION.FEMALE ? 'selected' : 'unselected'}
            onClick={() => dispatch({ type: 'SET_GENDER', payload: '여성' })}
          >
            {OPTION.FEMALE}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.OCCUPATION}</p>
        <DropDown />
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.MARRIED}</p>
        <div className={styles.buttonContainer}>
          <Button
            size="lg"
            variant={state.isMarried === true ? 'selected' : 'unselected'}
            onClick={() => dispatch({ type: 'SET_IS_MARRIED', payload: true })}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.isMarried === false ? 'selected' : 'unselected'}
            onClick={() => dispatch({ type: 'SET_IS_MARRIED', payload: false })}
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
            onClick={() => dispatch({ type: 'SET_HAS_CHILD', payload: true })}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.hasChild === false ? 'selected' : 'unselected'}
            onClick={() => dispatch({ type: 'SET_HAS_CHILD', payload: false })}
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
            onClick={() => dispatch({ type: 'SET_IS_DRIVER', payload: true })}
          >
            {OPTION.YES}
          </Button>
          <Button
            size="lg"
            variant={state.isDriver === false ? 'selected' : 'unselected'}
            onClick={() => dispatch({ type: 'SET_IS_DRIVER', payload: false })}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
