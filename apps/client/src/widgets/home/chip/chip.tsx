import { ReactNode } from 'react';

import * as styles from './chip.css';

const statusMap = {
  충분: 'enough',
  부족: 'sufficient',
  강력: 'strong',
} as const;

interface ChipProps {
  icon: ReactNode;
  title: string;
  status?: '충분' | '부족' | '강력';
}

const Chip = ({ icon, title, status }: ChipProps) => {
  const internalStatus = status ? statusMap[status] : undefined;

  return (
    <div className={styles.container}>
      {icon}
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.statusVariants({ status: internalStatus })}>
          {status}
        </div>
      </div>
    </div>
  );
};

export default Chip;
