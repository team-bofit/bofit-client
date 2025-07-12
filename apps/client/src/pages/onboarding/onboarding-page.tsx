import { Button, TextButton } from '@bds/ui';
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

import * as styles from './onboarding-page.css';

const stepSlugs = ['start', 'user', 'health', 'coverage', 'price', 'matching'];
const completePath = '/report';

const OnboardingPage = () => {
  const { Funnel, Step, go, currentStep, currentIndex } = useFunnel(
    stepSlugs,
    completePath,
  );

  const showNavigation = currentStep !== 'matching';
  const showProgressBar = currentStep !== 'start' && currentStep !== 'matching';

  const progressIndex = Math.max(currentIndex - 1, 0);
  const progressTotal = 4;

  const renderBottomButtons = () => {
    if (currentStep === 'matching') {
      return null;
    }

    if (currentStep === 'start') {
      return (
        <div className={styles.bottomContainer}>
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
        <Button variant="primary" size="lg" onClick={() => go(1)}>
          다음으로
        </Button>
      </div>
    );
  };

  return (
    <main>
      {showNavigation && (
        <Navigation
          leftIcon={<Icon name="caret_left_lg" onClick={() => go(-1)} />}
          rightIcon={<div />}
          title="정보입력"
        />
      )}

      {showProgressBar && (
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
          <HealthInfo />
        </Step>
        <Step name="coverage">
          <CoverageInfo />
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
