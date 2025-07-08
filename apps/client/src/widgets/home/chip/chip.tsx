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
        <p className={styles.title}>{title}</p>
        {status && (
          <p className={styles.statusVariants({ status: internalStatus })}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Chip;
