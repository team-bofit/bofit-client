import { useState } from 'react';
import { Title } from '@bds/ui';

import Button from '../button/button';

import * as styles from './grid-button.css';

const QUESTION_TEXT = `최근 5년 이내 병원에서 다음 질병을\n 진단 또는 치료받은 적 있나요?`;
const DESCRIPTION_TEXT = '정확한 추천을 위해 모두 선택해주세요.';

const BUTTON_ITEMS = [
  { text: '암' },
  { text: '뇌혈관질환', subText: '뇌출혈, 뇌경색' },
  { text: '심장질환' },
  { text: '호흡기질환' },
  { text: '간질환' },
  { text: '신장질환' },
  { text: '정신질환' },
  { text: '만성질환', subText: '고혈압, 당뇨 등' },
  { text: '해당없음' },
];

const GridButton = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (text: string) => {
    const isNone = text === '해당없음';

    if (isNone) {
      // "해당없음"을 누르면 나머지 선택 해제
      setSelectedItems(['해당없음']);
    } else {
      // 다른 버튼 누르면 "해당없음"은 해제
      const newSelection = selectedItems.includes(text)
        ? selectedItems.filter((item) => item !== text)
        : [...selectedItems.filter((item) => item !== '해당없음'), text];
      setSelectedItems(newSelection);
    }
  };

  return (
    <div>
      <Title fontStyle="bd_sm">{QUESTION_TEXT}</Title>
      <p className={styles.description}>{DESCRIPTION_TEXT}</p>
      <section className={styles.grid}>
        {BUTTON_ITEMS.map(({ text, subText }) => (
          <Button
            key={text}
            text={text}
            subText={subText}
            selected={selectedItems.includes(text)}
            onClick={() => handleSelect(text)}
          />
        ))}
      </section>
    </div>
  );
};

export default GridButton;
