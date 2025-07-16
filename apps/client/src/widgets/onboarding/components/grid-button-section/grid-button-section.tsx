import { Title } from '@bds/ui';

import { components } from '@shared/types/schema';

import Button from '../button/button';

import * as styles from './grid-button-section.css';

interface GridButtonSectionProps {
  question: string;
  description: string;
  selected: string[];
  onChange?: (selectedCodes: string[]) => void;
  diagnosedDiseases?: components['schemas']['DiagnosedDiseaseResponses'];
}

const GridButton = ({
  question,
  description,
  selected,
  onChange,
  diagnosedDiseases,
}: GridButtonSectionProps) => {
  const NONE_CODE = 'NONE';

  const handleSelect = (code: string) => {
    const isNone = code === NONE_CODE;
    let newSelection: string[];

    if (isNone) {
      newSelection = selected.includes(NONE_CODE) ? [] : [NONE_CODE];
    } else {
      const withoutNone = selected.filter((item) => item !== NONE_CODE);

      newSelection = selected.includes(code)
        ? withoutNone.filter((item) => item !== code)
        : [...withoutNone, code];
    }

    onChange?.(newSelection);
  };

  const onGridButtonClick = (text: string) => () => {
    handleSelect(text);
  };

  return (
    <section>
      <Title fontStyle="bd_sm">{question}</Title>
      <p className={styles.description}>{description}</p>
      <div className={styles.grid}>
        {diagnosedDiseases?.diagnosedDiseases?.map(
          ({ diagnosedDisease, displayName, description }) => (
            <Button
              key={diagnosedDisease}
              text={displayName ?? ''}
              subText={description}
              selected={
                diagnosedDisease ? selected.includes(diagnosedDisease) : false
              }
              onClick={
                diagnosedDisease
                  ? onGridButtonClick(diagnosedDisease)
                  : undefined
              }
            />
          ),
        )}
      </div>
    </section>
  );
};

export default GridButton;
