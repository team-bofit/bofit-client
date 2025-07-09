import * as styles from './chip.css';

const statusMap = {
  충분: 'enough',
  부족: 'sufficient',
  강력: 'strong',
} as const;

interface ChipProps {
  type: '충분' | '부족' | '강력';
}

const Chip = ({ type }: ChipProps) => {
  const internalStatus = type ? statusMap[type] : undefined;
  return (
    <div className={styles.container}>
      <p className={styles.chipText({ status: internalStatus })}>{status}</p>
    </div>
  );
};

export default Chip;
