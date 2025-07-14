import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, TextButton, toasts } from '@bds/ui';
import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import ProgressBar from '@widgets/onboarding/components/progress-bar/progress-bar';
import CoverageInfo from '@widgets/onboarding/components/step/coverage-info/coverage-info';
import HealthInfo from '@widgets/onboarding/components/step/health-info/health-info';
import MatchingLoader from '@widgets/onboarding/components/step/matching-loader/matching-loader';
import PriceInfo from '@widgets/onboarding/components/step/price-info/price-info';
import StartContent from '@widgets/onboarding/components/step/start-content/start-content';
import UserInfo from '@widgets/onboarding/components/step/user-info/user-info';
import {
  MOCK_COVERAGE,
  MOCK_DISEASES,
  MOCK_JOBS,
} from '@widgets/onboarding/mocks/user-info.mock';
import { UserInfoState } from '@widgets/onboarding/type/user-info.type';

import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

import * as styles from './onboarding-page.css';

const initialState: UserInfoState = {
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
  const navigate = useNavigate();

  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );
  const progressIndex = Math.max(currentIndex - 1, 0);
  const progressTotal = 4;

  const [basicInfoState, setBasicInfoState] =
    useState<UserInfoState>(initialState);
  const [healthFirstSelected, setHealthFirstSelected] = useState<string[]>([]);
  const [healthSecondSelected, setHealthSecondSelected] = useState<string[]>(
    [],
  );
  const [coverageSelected, setCoverageSelected] = useState<number[]>([]);

  const isUserValid = (() => {
    const v = basicInfoState;
    return (
      v.name.trim() !== '' &&
      v.birthYear.trim().length === 4 &&
      v.birthMonth.trim() !== '' &&
      v.birthDay.trim() !== '' &&
      v.gender !== null &&
      typeof v.occupation === 'string' &&
      v.occupation.trim() !== ''
    );
  })();

  const isHealthValid =
    healthFirstSelected.length > 0 && healthSecondSelected.length > 0;

  const handleCoverageSelectionChange = (selectedIndices: number[]) => {
    setCoverageSelected(selectedIndices);
  };

  const handleGoNext = () => go(1);
  const handleGoBack = () => go(-1);
  const handleGoHome = () => navigate(routePath.HOME);

  const handleLimitExceed = () => {
    toasts.show({
      message: '3순위까지만 선택할 수 있어요',
      duration: 3000,
      icon: <Icon name="check" color="error" />,
    });
  };

  const isNextEnabled =
    currentStep === 'start' ||
    ((currentStep === 'user' ? isUserValid : true) &&
      (currentStep === 'health' ? isHealthValid : true) &&
      (currentStep === 'coverage' ? coverageSelected.length > 0 : true));

  return (
    <main>
      {currentStep !== 'matching' && (
        <Navigation
          leftIcon={
            currentStep !== 'start' ? (
              <Icon name="caret_left_lg" onClick={handleGoBack} />
            ) : undefined
          }
          rightIcon={<Icon name="home" onClick={handleGoHome} />}
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
          <StartContent userName="홍길동" />
        </Step>
        <Step name="user">
          <UserInfo
            value={basicInfoState}
            onChange={setBasicInfoState}
            jobs={MOCK_JOBS}
          />
        </Step>
        <Step name="health">
          <HealthInfo
            onFirstChange={setHealthFirstSelected}
            onSecondChange={setHealthSecondSelected}
            firstSelected={healthFirstSelected}
            secondSelected={healthSecondSelected}
            diagnosedDiseases={MOCK_DISEASES}
          />
        </Step>
        <Step name="coverage">
          <CoverageInfo
            onLimitExceed={handleLimitExceed}
            selectedIndices={coverageSelected}
            onSelectionChange={handleCoverageSelectionChange}
            coverageItems={MOCK_COVERAGE}
          />
        </Step>
        <Step name="price">
          <PriceInfo />
        </Step>
        <Step name="matching">
          <MatchingLoader userName="홍길동" />
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
              <Button variant="primary" size="lg" onClick={handleGoNext}>
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
              onClick={handleGoNext}
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
