import { useCallback } from 'react';

import { UserInfoCoverageList } from '@widgets/onboarding/type/user-info.type';

import * as styles from './horizontal-button.css';

const MAX_SELECTED = 3;

interface HorizontalButtonProps {
  selectedIndices: number[];
  onSelectionChange: (selectedIndices: number[]) => void;
  onLimitExceed?: () => void;
  coverageItems?: UserInfoCoverageList;
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
      {coverageItems?.map((item, idx) => (
        <button
          key={idx}
          type="button"
          className={styles.button({
            selected: selectedIndices.includes(idx),
          })}
          onClick={handleClick(idx)}
        >
          <span className={styles.label}>{item.description}</span>
          {selectedIndices.includes(idx) && (
            <span className={styles.order}>
              {selectedIndices.indexOf(idx) + 1}
            </span>
          )}
        </button>
      ))}
    </section>
  );
};

export default HorizontalButton;
