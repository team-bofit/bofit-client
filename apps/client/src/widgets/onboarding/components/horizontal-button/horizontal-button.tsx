import { useState } from 'react';

import * as styles from '@widgets/onboarding/components/horizontal-button/horizontal-button.css';

const OPTIONS = [
  '암·심장질환 같은 큰 병에 대비하고 싶어요',
  '사망 시 가족에게 경제적 도움이 되는 보장을 원해요',
  '합리적인 보험료로 꼭 필요한 보장만 챙기고 싶어요',
  '예기치 않은 사고에 대비하고 싶어요',
  '수술할 일이 생겼을 때 보장받고 싶어요',
  '가격이 좀 높아도 폭넓은 보장을 받고 싶어요',
  '잘 모르겠어요. 많이 선택하는 걸로 설정할래요',
];

interface HorizontalButtonProps {
  onLimitExceed?: () => void;
}

const HorizontalButton = ({ onLimitExceed }: HorizontalButtonProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else if (selected.length < 3) {
      setSelected([...selected, index]);
    } else {
      onLimitExceed?.();
    }
  };

  const items = OPTIONS.map((text, idx) => {
    const selectedIndex = selected.indexOf(idx);
    return {
      idx,
      text,
      isSelected: selectedIndex !== -1,
      order: selectedIndex !== -1 ? selectedIndex + 1 : null,
    };
  });

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>
            {items.map(({ idx, text, isSelected, order }) => (
              <button
                key={idx}
                type="button"
                className={`${styles.button} ${isSelected ? styles.selected : ''}`}
                onClick={() => toggleSelect(idx)}
              >
                <span className={styles.label}>{text}</span>
                {order && <span className={styles.order}>{order}</span>}
              </button>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default HorizontalButton;
