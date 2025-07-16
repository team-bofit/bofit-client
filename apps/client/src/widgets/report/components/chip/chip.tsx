import { StatusType } from '@shared/types/type';

import * as styles from './chip.css';

const statusMap = {
  충분: 'enough',
  부족: 'sufficient',
  강력: 'strong',
} as const;

interface ChipProps {
  type?: StatusType;
}

const Chip = ({ type }: ChipProps) => {
  const internalStatus = type ? statusMap[type] : undefined;
  return (
    <div className={styles.container}>
      <p className={styles.chipText({ status: internalStatus })}>{type}</p>
    </div>
  );
};

export default Chip;
