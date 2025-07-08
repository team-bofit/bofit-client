import * as styles from './progress-bar.css';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const safeTotalSteps = Math.max(1, totalSteps);
  const safeCurrentStep = Math.max(1, Math.min(currentStep, safeTotalSteps));
  const progressPercent = (safeCurrentStep / safeTotalSteps) * 100;
  const isFinalStep = safeCurrentStep === safeTotalSteps;

  return (
    <div className={styles.container}>
      <div className={styles.barBackground}>
        <div
          className={styles.barFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className={styles.text}>
        <span>
          <span className={styles.textCurrent}>{currentStep}</span>
          <span className={styles.textTotal}>/{totalSteps}</span>
        </span>
        {isFinalStep && <p className={styles.textDone}>다 왔어요!</p>}
      </div>
    </div>
  );
};

export default ProgressBar;
