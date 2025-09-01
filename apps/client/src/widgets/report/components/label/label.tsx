import { StatusType } from '@shared/types/type';

import * as styles from './label.css.ts';

const statusMap = {
  충분: 'enough',
  부족: 'sufficient',
  강력: 'strong',
} as const;

interface ChipProps {
  type?: StatusType;
}

const Label = ({ type }: ChipProps) => {
  const internalStatus = type ? statusMap[type] : undefined;
  return (
    <div className={styles.container}>
      <p className={styles.chipText({ status: internalStatus })}>{type}</p>
    </div>
  );
};

export default Label;
