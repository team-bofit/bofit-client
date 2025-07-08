import * as styles from './chip.css';

const statusMap = {
  충분: 'enough',
  부족: 'sufficient',
  강력: 'strong',
} as const;
interface ChipProps {
  status: '충분' | '부족' | '강력';
}

const Chip = ({ status }: ChipProps) => {
  const internalStatus = status ? statusMap[status] : undefined;
  return (
    <div className={styles.container}>
      <p className={styles.chipText({ status: internalStatus })}>{status}</p>
    </div>
  );
};

export default Chip;
