import * as styles from './chip.css';

interface ChipProps {
  state: string;
}

const Chip = ({ state }: ChipProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.chipText}>{state}</p>
    </div>
  );
};

export default Chip;
