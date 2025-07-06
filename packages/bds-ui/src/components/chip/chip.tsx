import * as styles from './chip.css';

interface ChipProps {
  label: string;
  color: 'gray' | 'primary';
  size: 'rectangular' | 'rounded';
  outline?: boolean;
}

const Chip = ({ label, color, size, outline = false }: ChipProps) => {
  return (
    <button
      className={styles.chipVariants({
        color,
        size,
        outline,
      })}
    >
      {label}
    </button>
  );
};

export default Chip;
