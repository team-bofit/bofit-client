import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form';

import { Button, InfoBox, Title } from '@bds/ui';

import { etcData } from '@widgets/onboarding/mocks/etc-mocks';

import OnboardingTitle from '../../onboarding-title/onboarding-title';

import * as styles from './etcetera-info.css';

const ETC_TITLE = '기타정보';
const ETC_DESCRIPTION = '기타 보험 정보를 \n입력해주세요(선택)';
const ETC_CAPTION = '보험종류 ,만기, 납부기간은 선택 입력사항이에요.';

const CHOICE_QUESTION = {
  DESIRED_INSURANCE: '희망하는 보험 종류를 선택해주세요',
  PAYMENT_PERIOD: '납부기간을 선택해주세요',
  INSURANCE_EXPIRATION: '보험의 만기를 선택해주세요',
};

const INSURANCE_TYPE = {
  RENEWAL_TYPE: '납입구조',
  REFUND_TYPE: '환급구조',
};

const INFO_DESCRIPTION = {
  PAYMENT: (
    <p>
      <strong>갱신형</strong>은 일정 기간마다 보험료가 재산정되어 오를 수 있고,{' '}
      <strong>비갱신형</strong>은 가입 시 정해진 보험료가 만기까지 동일하게
      유지되는 구조예요.
    </p>
  ),
  RETURN: (
    <p>
      <strong>순수보장형</strong>은 중도 해지 시 환급금이 없어서 보험료가
      저렴해요. <strong>일부환급형</strong>은 일부 환급이 가능하고,{' '}
      <strong>만기환급형</strong>은 만기 시 납입보험료 대부분을 돌려받을 수
      있어요.
    </p>
  ),
};

const EtceteraInfo = () => {
  const { control, setValue } = useFormContext();

  const handleFieldChange = (
    field: ControllerRenderProps,
    buttonText: string,
    fieldName: string,
  ) => {
    if (field.value === buttonText) {
      setValue(fieldName, null);
    } else {
      setValue(fieldName, buttonText);
    }
  };

  return (
    <>
      <div className={styles.etcInfoContainer}>
        <div className={styles.onboardingTitleContainer}>
          <OnboardingTitle
            title={ETC_TITLE}
            description={ETC_DESCRIPTION}
            caption={ETC_CAPTION}
          />
        </div>

        <main className={styles.onboardingContentContainer}>
          <section>
            <Title fontStyle="bd_md">{CHOICE_QUESTION.DESIRED_INSURANCE}</Title>
            <div className={styles.allStructureContainer}>
              <div className={styles.structureContainer}>
                <Title fontStyle="bd_sm">{INSURANCE_TYPE.RENEWAL_TYPE}</Title>
                <Controller
                  name="renewalType"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonContainer}>
                      {etcData.renewalTypes.map(({ displayName }) => (
                        <Button
                          key={displayName}
                          type="button"
                          size="lg"
                          variant={
                            field.value === displayName
                              ? 'selected'
                              : 'unselected'
                          }
                          onClick={() =>
                            handleFieldChange(field, displayName, 'renewalType')
                          }
                        >
                          {displayName}
                        </Button>
                      ))}
                    </div>
                  )}
                />
                <InfoBox
                  iconSize="2rem"
                  size="md"
                  highlightDescription={INFO_DESCRIPTION.PAYMENT}
                />
              </div>
              <div className={styles.structureContainer}>
                <Title fontStyle="bd_sm">{INSURANCE_TYPE.REFUND_TYPE}</Title>
                <Controller
                  name="refundType"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonContainer}>
                      {etcData.refuntType.map(({ displayName }) => (
                        <Button
                          key={displayName}
                          type="button"
                          size="lg"
                          variant={
                            field.value == displayName
                              ? 'selected'
                              : 'unselected'
                          }
                          onClick={() =>
                            handleFieldChange(field, displayName, 'refundType')
                          }
                        >
                          {displayName}
                        </Button>
                      ))}
                    </div>
                  )}
                />
                <InfoBox
                  iconSize="2rem"
                  size="md"
                  highlightDescription={INFO_DESCRIPTION.RETURN}
                />
              </div>
            </div>
          </section>

          <section className={styles.choiceQuestionContainer}>
            <Title fontStyle="bd_md">{CHOICE_QUESTION.PAYMENT_PERIOD}</Title>
            <Controller
              name="paymentPeriodYears"
              control={control}
              render={({ field }) => (
                <div className={styles.buttonContainer}>
                  {etcData.paymentPeriodYears.map(({ displayName }) => (
                    <Button
                      key={displayName}
                      type="button"
                      size="lg"
                      variant={
                        field.value == displayName ? 'selected' : 'unselected'
                      }
                      onClick={() =>
                        handleFieldChange(
                          field,
                          displayName,
                          'paymentPeriodYears',
                        )
                      }
                    >
                      {displayName}
                    </Button>
                  ))}
                </div>
              )}
            />
          </section>

          <section className={styles.choiceQuestionContainer}>
            <Title fontStyle="bd_md">
              {CHOICE_QUESTION.INSURANCE_EXPIRATION}
            </Title>
            <Controller
              name="maturityAge"
              control={control}
              render={({ field }) => (
                <div className={styles.buttonContainer}>
                  {etcData.maturityAge.map(({ displayName }) => (
                    <Button
                      key={displayName}
                      type="button"
                      size="lg"
                      variant={
                        field.value == displayName ? 'selected' : 'unselected'
                      }
                      onClick={() =>
                        handleFieldChange(field, displayName, 'maturityAge')
                      }
                    >
                      {displayName}
                    </Button>
                  ))}
                </div>
              )}
            />
          </section>
        </main>
      </div>

      <div className={styles.nextButtonContainer}>
        <Button type="submit" variant="primary" size="lg">
          다음으로
        </Button>
      </div>
    </>
  );
};

export default EtceteraInfo;
