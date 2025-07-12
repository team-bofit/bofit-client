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
  const [coverageSelected, setCoverageSelected] = useState<number[]>([]);

  const isNextEnabled =
    currentStep === 'start' ||
    (currentStep === 'coverage' ? coverageSelected.length > 0 : true);

  const handleCoverageSelectionChange = (selectedIndices: number[]) => {
    setCoverageSelected(selectedIndices);
  };

  const handleLimitExceed = () => {
    toasts.show({
      message: '3순위까지만 선택할 수 있어요',
      duration: 3000,
      icon: <Icon name="check" color="error" />,
    });
  };

  const renderBottomButtons = () => {
    if (currentStep === 'matching') {
      return null;
    }

    if (currentStep === 'start') {
      return (
        <div className={styles.startBottomContainer}>
          <Button variant="primary" size="lg" onClick={() => go(1)}>
            정보 입력 시작하기
          </Button>
          <TextButton color="black" onClick={() => go(-1)}>
            나중에 추천받을래요
          </TextButton>
        </div>
      );
    }

    return (
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
    );
  };

  const renderNavigation = () =>
    currentStep !== 'matching' ? (
      <Navigation
        leftIcon={
          currentStep !== 'start' ? (
            <Icon name="caret_left_lg" onClick={() => go(-1)} />
          ) : undefined
        }
        rightIcon={
          <Icon name="home" onClick={() => navigate(routePath.HOME)} />
        }
        title="정보입력"
      />
    ) : null;

  const renderProgressBar = () =>
    currentStep !== 'start' && currentStep !== 'matching' ? (
      <ProgressBar currentStep={progressIndex + 1} totalSteps={progressTotal} />
    ) : null;

  return (
    <main>
      {renderNavigation()}
      {renderProgressBar()}
      <Funnel>
        <Step name="start">
          <StartContent userName="홍길동" />
        </Step>
        <Step name="user">
          <UserInfo />
        </Step>
        <Step name="health">
          <HealthInfo />
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

      {renderBottomButtons()}
    </main>
  );
};

export default OnboardingPage;
