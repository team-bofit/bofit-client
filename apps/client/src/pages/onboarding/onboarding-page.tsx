import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Button, TextButton, toasts } from '@bds/ui';
import { Navigation } from '@bds/ui';
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
import { UserInfoStateProps } from '@widgets/onboarding/type/user-info.type';
import { buildSubmitPayload } from '@widgets/onboarding/utils/build-submit-payload';

import {
  usePostUserInfo,
  USER_QUERY_OPTIONS,
} from '@shared/api/domain/onboarding/queries';
import { useFunnel } from '@shared/hooks/use-funnel';
import { useUserInfoValid } from '@shared/hooks/use-user-info-valid';
import { routePath } from '@shared/router/path';

import * as styles from './onboarding-page.css';

const initialState: UserInfoStateProps = {
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  gender: '여성',
  occupation: '',
  isMarried: false,
  hasChild: false,
  isDriver: false,
};

const stepSlugs = ['start', 'user', 'health', 'coverage', 'price', 'matching'];
const completePath = routePath.REPORT;

const OnboardingPage = () => {
  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const progressIndex = Math.max(currentIndex - 1, 0);
  const progressTotal = stepSlugs.filter(
    (s) => s !== 'start' && s !== 'matching',
  ).length;

  // API
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

  const handlePostUserInfo = () => {
    const payload = buildSubmitPayload({
      basicInfoState,
      healthFirstSelected,
      healthSecondSelected,
      coverageSelected,
      priceRange,
      userJobs: userJobs?.data?.jobs ?? [],
      diagnosedDiseases: userDiseases?.data?.diagnosedDiseases ?? [],
      coverageItems: userCoverages?.data?.coveragePreferenceResponses ?? [],
    });

    mutate(payload);
  };

  const showOpenModal = () => {
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

  const [basicInfoState, setBasicInfoState] =
    useState<UserInfoStateProps>(initialState);
  const [healthFirstSelected, setHealthFirstSelected] = useState<string[]>([]);
  const [healthSecondSelected, setHealthSecondSelected] = useState<string[]>(
    [],
  );
  const [coverageSelected, setCoverageSelected] = useState<number[]>([]);

  const [priceRange, setPriceRange] = useState<[number, number]>([7, 15]);

  const isUserValid = useUserInfoValid(basicInfoState);

  const isHealthValid =
    healthFirstSelected.length > 0 && healthSecondSelected.length > 0;

  const handleCoverageSelectionChange = (selectedIndices: number[]) => {
    setCoverageSelected(selectedIndices);
  };

  const handleGoHome = () => navigate(routePath.HOME);

  const handleLimitExceed = () => {
    toasts.show({
      message: '3순위까지만 선택할 수 있어요',
      duration: 3000,
      icon: <Icon name="check" color="error" />,
    });
  };

  const stepValidationMap: Record<string, boolean> = {
    start: true,
    user: isUserValid,
    health: isHealthValid,
    coverage: coverageSelected.length > 0,
  };

  const isNextEnabled = stepValidationMap[currentStep] ?? true;

  return (
    <main>
      {currentStep !== 'matching' && (
        <Navigation
          leftIcon={
            currentStep !== 'start' ? <Icon name="caret_left_lg" /> : undefined
          }
          onClickLeft={() => go(-1)}
          rightIcon={<Icon name="home" />}
          onClickRight={handleGoHome}
          title="정보입력"
        />
      )}

      {currentStep !== 'start' && currentStep !== 'matching' && (
        <ProgressBar
          currentStep={progressIndex + 1}
          totalSteps={progressTotal}
        />
      )}

      <Funnel>
        <Step name="start">
          <StartContent userName={userData?.data?.nickname} />
          <div className={styles.startBottomContainer}>
            <Button variant="primary" size="lg" onClick={() => go(1)}>
              정보 입력 시작하기
            </Button>
            <TextButton color="black" onClick={handleGoHome}>
              나중에 추천받을래요
            </TextButton>
          </div>
        </Step>
        <Step name="user">
          <UserInfo
            value={basicInfoState}
            onChange={setBasicInfoState}
            jobs={userJobs?.data}
          />
          <div className={styles.defaultButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => go(1)}
              disabled={!isNextEnabled}
            >
              다음으로
            </Button>
          </div>
        </Step>
        <Step name="health">
          <HealthInfo
            onFirstChange={setHealthFirstSelected}
            onSecondChange={setHealthSecondSelected}
            firstSelected={healthFirstSelected}
            secondSelected={healthSecondSelected}
            diagnosedDiseases={userDiseases?.data}
          />
          <div className={styles.defaultButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => go(1)}
              disabled={!isNextEnabled}
            >
              다음으로
            </Button>
          </div>
        </Step>
        <Step name="coverage">
          <CoverageInfo
            onLimitExceed={handleLimitExceed}
            selectedIndices={coverageSelected}
            onSelectionChange={handleCoverageSelectionChange}
            coverageItems={userCoverages?.data}
          />
          <div className={styles.defaultButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => go(1)}
              disabled={!isNextEnabled}
            >
              다음으로
            </Button>
          </div>
        </Step>
        <Step name="price">
          <PriceInfo priceRange={priceRange} setPriceRange={setPriceRange} />
          <div className={styles.defaultButtonContainer}>
            <Button
              variant="primary"
              size="lg"
              onClick={showOpenModal}
              disabled={!isNextEnabled}
            >
              다음으로
            </Button>
          </div>
        </Step>
        <Step name="matching">
          <MatchingLoader userName={userData?.data?.nickname} />
        </Step>
      </Funnel>
    </main>
  );
};

export default OnboardingPage;
