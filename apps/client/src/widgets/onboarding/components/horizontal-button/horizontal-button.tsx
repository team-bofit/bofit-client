import { useCallback } from 'react';

import { CoverageItem } from '@widgets/onboarding/type/user-info.type';

import * as styles from './horizontal-button.css';

const MAX_SELECTED = 3;

interface HorizontalButtonProps {
  selectedIndices: number[];
  onSelectionChange: (selectedIndices: number[]) => void;
  onLimitExceed?: () => void;
  coverageItems: CoverageItem[];
}

const HorizontalButton = ({
  selectedIndices,
  onSelectionChange,
  onLimitExceed,
  coverageItems,
}: HorizontalButtonProps) => {
  const toggleSelect = useCallback(
    (index: number) => {
      const selectedSet = new Set(selectedIndices);

      if (selectedSet.has(index)) {
        selectedSet.delete(index);
      } else if (selectedSet.size >= MAX_SELECTED) {
        onLimitExceed?.();
        return;
      } else {
        selectedSet.add(index);
      }

      onSelectionChange(Array.from(selectedSet));
    },
    [selectedIndices, onLimitExceed, onSelectionChange],
  );
  const handleClick = useCallback(
    (idx: number) => () => {
      toggleSelect(idx);
    },
    [toggleSelect],
  );

  return (
    <section className={styles.table}>
      {coverageItems.map((item, idx) => {
        const order = selectedIndices.indexOf(idx);
        const isSelected = order !== -1;
        const showOrder = isSelected ? order + 1 : null;

        return (
          <button
            key={idx}
            type="button"
            className={styles.button({ selected: isSelected })}
            onClick={handleClick(idx)}
          >
            <span className={styles.label}>{item.description}</span>
            {isSelected && <span className={styles.order}>{showOrder}</span>}
          </button>
        );
      })}
    </section>
  );
};

export default HorizontalButton;
