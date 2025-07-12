import { useCallback, useState } from 'react';
import { Title } from '@bds/ui';

import Button from '../button/button';

import * as styles from './grid-button-section.css';

const NONE_TEXT = '해당없음';

const BUTTON_ITEMS = [
  { text: '암' },
  { text: '뇌혈관질환', subText: '뇌출혈, 뇌경색' },
  { text: '심장질환' },
  { text: '호흡기질환' },
  { text: '간질환' },
  { text: '신장질환' },
  { text: '정신질환' },
  { text: '만성질환', subText: '고혈압, 당뇨 등' },
  { text: NONE_TEXT },
];

interface GridButtonSectionProps {
  question: string;
  description: string;
  onChange?: (selectedItems: string[]) => void;
}

const GridButton = ({
  question,
  description,
  onChange,
}: GridButtonSectionProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (text: string) => {
    const isNone = text === NONE_TEXT;
    let newSelection: string[];

    if (isNone) {
      newSelection = selectedItems.includes(NONE_TEXT) ? [] : [NONE_TEXT];
    } else {
      const withoutNone = selectedItems.filter((item) => item !== NONE_TEXT);

      newSelection = selectedItems.includes(text)
        ? withoutNone.filter((item) => item !== text)
        : [...withoutNone, text];
    }

    setSelectedItems(newSelection);
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
        {BUTTON_ITEMS.map(({ text, subText }) => {
          return (
            <Button
              key={text}
              text={text}
              subText={subText}
              selected={selectedItems.includes(text)}
              onClick={onGridButtonClick(text)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default GridButton;
