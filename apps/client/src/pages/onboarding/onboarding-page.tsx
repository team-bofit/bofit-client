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

import { useFunnel } from '@shared/hooks/use-funnel';
import { routePath } from '@shared/router/path';

import * as styles from './onboarding-page.css';

const stepSlugs = ['start', 'user', 'health', 'coverage', 'price', 'matching'];
const completePath = routePath.REPORT;

const OnboardingPage = () => {
  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );
  const navigate = useNavigate();

  const progressIndex = Math.max(currentIndex - 1, 0);
  const progressTotal = 4;

  const [healthFirstSelected, setHealthFirstSelected] = useState<string[]>([]);
  const [healthSecondSelected, setHealthSecondSelected] = useState<string[]>(
    [],
  );

  const [coverageSelected, setCoverageSelected] = useState<number[]>([]);

  const isHealthValid =
    healthFirstSelected.length > 0 && healthSecondSelected.length > 0;

  const isNextEnabled =
    currentStep === 'start' ||
    ((currentStep === 'coverage' ? coverageSelected.length > 0 : true) &&
      (currentStep === 'health' ? isHealthValid : true));

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
          <UserInfo />
        </Step>
        <Step name="health">
          <HealthInfo
            onFirstChange={setHealthFirstSelected}
            onSecondChange={setHealthSecondSelected}
            firstSelected={healthFirstSelected}
            secondSelected={healthSecondSelected}
          />
        </Step>
        <Step name="coverage">
          <CoverageInfo
            onLimitExceed={handleLimitExceed}
            selectedIndices={coverageSelected}
            onSelectionChange={handleCoverageSelectionChange}
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
              <TextButton color="black" onClick={handleGoBack}>
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
