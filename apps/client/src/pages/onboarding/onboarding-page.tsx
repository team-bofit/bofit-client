import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Navigation, toasts } from '@bds/ui';
import { useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import InsuranceNoticeModal from '@widgets/onboarding/components/insurance-notice-modal/insurance-notice-modal';
import ProgressBar from '@widgets/onboarding/components/progress-bar/progress-bar';
import CoverageInfo from '@widgets/onboarding/components/step/coverage-info/coverage-info';
import HealthInfo from '@widgets/onboarding/components/step/health-info/health-info';
import MatchingLoader from '@widgets/onboarding/components/step/matching-loader/matching-loader';
import PriceInfo from '@widgets/onboarding/components/step/price-info/price-info';
import StartContent from '@widgets/onboarding/components/step/start-content/start-content';
import UserInfo from '@widgets/onboarding/components/step/user-info/user-info';
import {
  onboardingDefaultValues,
  type OnboardingForm,
  onboardingSchema,
} from '@widgets/onboarding/schemas/onboarding-schema';
import { buildSubmitPayload } from '@widgets/onboarding/utils/build-submit-payload';

import {
  usePostUserInfo,
  USER_QUERY_OPTIONS,
} from '@shared/api/domain/onboarding/queries';
import { SwitchCase } from '@shared/components/switch-case';
import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

const stepSlugs = ['start', 'user', 'health', 'coverage', 'price', 'matching'];
const completePath = routePath.REPORT;

const OnboardingPage = () => {
  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );

  const methods = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: onboardingDefaultValues,
  });
  const { watch, getValues, handleSubmit } = methods;

  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const handleGoHome = () => navigate(routePath.HOME);

  const progressIndex = Math.max(currentIndex - 1, 0);
  const excluded = ['start', 'matching'];
  const progressTotal = stepSlugs.filter((s) => !excluded.includes(s)).length;

  const { data: userData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  const { data: userJobs } = useSuspenseQuery(USER_QUERY_OPTIONS.JOBS());
  const { data: userDiseases } = useSuspenseQuery(
    USER_QUERY_OPTIONS.DISEASES(),
  );
  const { data: userCoverages } = useSuspenseQuery(
    USER_QUERY_OPTIONS.COVERAGES(),
  );

  if (userData?.data?.isRecommendInsurance) {
    navigate(routePath.HOME);
  }
  const { mutate } = usePostUserInfo(() => {
    navigate(routePath.REPORT);
  });

  const handleLimitExceed = () => {
    toasts.show({
      message: '3순위까지만 선택할 수 있어요',
      duration: 3000,
      icon: <Icon name="check" color="error" />,
    });
  };

  const isNextEnabled = (() => {
    switch (currentStep) {
      case 'user': {
        const { name, gender, job } = watch();
        return !!name && !!gender && !!job;
      }
      case 'health': {
        const health = watch('health');
        return (
          (health.self?.length ?? 0) > 0 && (health.family?.length ?? 0) > 0
        );
      }
      case 'coverage': {
        const indices = watch('coverageIndices');
        return (indices?.length ?? 0) >= 1;
      }
      case 'price': {
        const [min, max] = watch('priceRange') ?? [7, 15];
        return min < max;
      }
      default:
        return true;
    }
  })();

  const handlePostUserInfo = () => {
    const form = getValues();
    const payload = buildSubmitPayload({
      basicInfoState: {
        name: form.name,
        birthYear: form.birthYear,
        birthMonth: form.birthMonth,
        birthDay: form.birthDay,
        occupation: form.job,
        gender: form.gender,
        isMarried: form.isMarried,
        hasChild: form.hasChild,
        isDriver: form.isDriver,
      },
      healthFirstSelected: form.health.self,
      healthSecondSelected: form.health.family,
      coverageSelected: form.coverageIndices,
      priceRange: form.priceRange,

      userJobs: userJobs?.data?.jobs ?? [],
      diagnosedDiseases: userDiseases?.data?.diagnosedDiseases ?? [],
      coverageItems: userCoverages?.data?.coveragePreferenceResponses ?? [],
    });

    mutate(payload);
  };

  const handleFormSubmit = () => {
    openModal(
      <InsuranceNoticeModal
        onAccept={() => {
          handlePostUserInfo();
          go(1);
        }}
        closeModal={closeModal}
      />,
    );
  };

  return (
    <main>
      <SwitchCase
        value={currentStep}
        caseBy={{
          start: () => (
            <Navigation
              rightIcon={<Icon name="home" />}
              onClickRight={handleGoHome}
              title="정보입력"
            />
          ),
          matching: () => null,
        }}
        defaultComponent={() => (
          <>
            <Navigation
              leftIcon={<Icon name="caret_left_lg" />}
              onClickLeft={() => go(-1)}
              rightIcon={<Icon name="home" />}
              onClickRight={handleGoHome}
              title="정보입력"
            />
            <ProgressBar
              currentStep={progressIndex + 1}
              totalSteps={progressTotal}
            />
          </>
        )}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Funnel>
            <Step name="start">
              <StartContent
                userName={userData?.data?.nickname}
                handleGoHome={handleGoHome}
                go={go}
              />
            </Step>
            <Step name="user">
              <UserInfo
                jobs={userJobs?.data}
                isNextEnabled={isNextEnabled}
                go={go}
              />
            </Step>
            <Step name="health">
              <HealthInfo
                diagnosedDiseases={userDiseases?.data}
                isNextEnabled={isNextEnabled}
                go={go}
              />
            </Step>
            <Step name="coverage">
              <CoverageInfo
                onLimitExceed={handleLimitExceed}
                coverageItems={userCoverages?.data}
                isNextEnabled={isNextEnabled}
                go={go}
              />
            </Step>
            <Step name="price">
              <PriceInfo isNextEnabled={isNextEnabled} />
            </Step>
            <Step name="matching">
              <MatchingLoader userName={userData?.data?.nickname} />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  );
};

export default OnboardingPage;
