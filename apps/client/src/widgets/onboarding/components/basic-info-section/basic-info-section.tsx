import { Control, Controller, useController } from 'react-hook-form';
import z from 'zod';

import { Button, Input } from '@bds/ui';

import { onboardingFormSchema } from '@widgets/onboarding/schemas/onboarding-form-schema';

import { components } from '@shared/types/schema';

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

interface BasicInfoSectionProps {
  control: Control<z.infer<typeof onboardingFormSchema>>;
  jobs?: components['schemas']['JobResponses'];
}

const yearInputId = 'birth-year-input';
const monthInputId = 'birth-month-input';
const dayInputId = 'birth-day-input';

const BasicInfoSection = ({ jobs, control }: BasicInfoSectionProps) => {
  const { field: gender } = useController({ name: 'gender', control });
  const { field: job } = useController({ name: 'job', control });
  const { field: isMarried } = useController({ name: 'isMarried', control });
  const { field: hasChild } = useController({ name: 'hasChild', control });
  const { field: isDriver } = useController({ name: 'isDriver', control });

  const handleBirthChange =
    (
      fieldOnChange: (v: string) => void,
      maxLength: number,
      nextFieldName?: string,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNumber = e.target.value.replace(/\D/g, '').slice(0, maxLength);
      fieldOnChange(onlyNumber);

      if (onlyNumber.length === maxLength && nextFieldName) {
        requestAnimationFrame(() => {
          const el = document.getElementById(nextFieldName);
          el?.focus();
        });
      }
    };

  return (
    <section className={styles.basicContainer}>
      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.NAME}</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value ?? ''}
              onChange={field.onChange}
              bgColor="background"
              placeholder={OPTION.NAME_PLACEHOLDER}
            />
          )}
        />
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.BIRTHDATE}</p>
        <div className={styles.birthdateContainer}>
          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Controller
                name="birthYear"
                control={control}
                render={({ field }) => (
                  <Input
                    id={yearInputId}
                    placeholder="YYYY"
                    maxLength={4}
                    bgColor="background"
                    value={field.value ?? ''}
                    onChange={handleBirthChange(
                      field.onChange,
                      4,
                      monthInputId,
                    )}
                  />
                )}
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.YEAR}</span>
          </div>

          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Controller
                name="birthMonth"
                control={control}
                render={({ field }) => (
                  <Input
                    id={monthInputId}
                    placeholder="MM"
                    maxLength={2}
                    bgColor="background"
                    value={field.value ?? ''}
                    onChange={handleBirthChange(field.onChange, 2, dayInputId)}
                  />
                )}
              />
            </div>
            <span className={styles.birthdateLabel}>{OPTION.MONTH}</span>
          </div>

          <div className={styles.birthInputContainer}>
            <div className={styles.birthdateInput}>
              <Controller
                name="birthDay"
                control={control}
                render={({ field }) => (
                  <Input
                    id={dayInputId}
                    placeholder="DD"
                    maxLength={2}
                    bgColor="background"
                    value={field.value ?? ''}
                    onChange={handleBirthChange(field.onChange, 2)}
                  />
                )}
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
            type="button"
            size="lg"
            variant={gender.value === 'MALE' ? 'selected' : 'unselected'}
            onClick={() => gender.onChange('MALE')}
          >
            {OPTION.MALE}
          </Button>
          <Button
            type="button"
            size="lg"
            variant={gender.value === 'FEMALE' ? 'selected' : 'unselected'}
            onClick={() => gender.onChange('FEMALE')}
          >
            {OPTION.FEMALE}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.OCCUPATION}</p>
        <DropDown
          selected={job.value || null}
          onSelect={(val: string) => job.onChange(val)}
          jobs={jobs}
        />
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.MARRIED}</p>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            size="lg"
            variant={isMarried.value ? 'selected' : 'unselected'}
            onClick={() => isMarried.onChange(true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            type="button"
            size="lg"
            variant={!isMarried.value ? 'selected' : 'unselected'}
            onClick={() => isMarried.onChange(false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.CHILD}</p>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            size="lg"
            variant={hasChild.value ? 'selected' : 'unselected'}
            onClick={() => hasChild.onChange(true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            type="button"
            size="lg"
            variant={!hasChild.value ? 'selected' : 'unselected'}
            onClick={() => hasChild.onChange(false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>

      <div className={styles.fieldContainer}>
        <p className={styles.fieldNameLabel}>{LABEL.DRIVER}</p>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            size="lg"
            variant={isDriver.value ? 'selected' : 'unselected'}
            onClick={() => isDriver.onChange(true)}
          >
            {OPTION.YES}
          </Button>
          <Button
            type="button"
            size="lg"
            variant={!isDriver.value ? 'selected' : 'unselected'}
            onClick={() => isDriver.onChange(false)}
          >
            {OPTION.NO}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
