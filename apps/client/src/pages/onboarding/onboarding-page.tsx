import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { tokenService } from '@shared/auth/services/token-service';
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
  const { data: userData } = useQuery(USER_QUERY_OPTIONS.PROFILE());
  const { data: userJobs } = useQuery(USER_QUERY_OPTIONS.JOBS());
  const { data: userDiseases } = useQuery(USER_QUERY_OPTIONS.DISEASES());
  const { data: userCoverages } = useQuery(USER_QUERY_OPTIONS.COVERAGES());
  const navigate = useNavigate();

  const { openModal, closeModal } = useModal();

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

  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );
  const progressIndex = Math.max(currentIndex - 1, 0);
  const progressTotal = 4;

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

  const handleGo = (step: number) => {
    go(step);
  };

  const isNeedTermsAgreement = () =>
    currentStep === 'price' && tokenService.getIsTermsToken() !== 'true';

  const handleNext = () => {
    if (isNeedTermsAgreement()) {
      openTermsModal();
    } else {
      go(1);
    }
  };

  const openTermsModal = () => {
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
          onClickLeft={() => handleGo(-1)}
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
        </Step>
        <Step name="user">
          <UserInfo
            value={basicInfoState}
            onChange={setBasicInfoState}
            jobs={userJobs?.data}
          />
        </Step>
        <Step name="health">
          <HealthInfo
            onFirstChange={setHealthFirstSelected}
            onSecondChange={setHealthSecondSelected}
            firstSelected={healthFirstSelected}
            secondSelected={healthSecondSelected}
            diagnosedDiseases={userDiseases?.data}
          />
        </Step>
        <Step name="coverage">
          <CoverageInfo
            onLimitExceed={handleLimitExceed}
            selectedIndices={coverageSelected}
            onSelectionChange={handleCoverageSelectionChange}
            coverageItems={userCoverages?.data}
          />
        </Step>
        <Step name="price">
          <PriceInfo priceRange={priceRange} setPriceRange={setPriceRange} />
        </Step>
        <Step name="matching">
          <MatchingLoader userName={userData?.data?.nickname} />
        </Step>
      </Funnel>

      {currentStep !== 'matching' && (
        <div
          className={
            currentStep === 'start'
              ? styles.startBottomContainer
              : styles.defaultButtonContainer
          }
        >
          {currentStep === 'start' ? (
            <>
              <Button variant="primary" size="lg" onClick={() => handleGo(1)}>
                정보 입력 시작하기
              </Button>
              <TextButton color="black" onClick={handleGoHome}>
                나중에 추천받을래요
              </TextButton>
            </>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              disabled={!isNextEnabled}
            >
              다음으로
            </Button>
          )}
        </div>
      )}
    </main>
  );
};

export default OnboardingPage;
