import * as styles from './chip.css';

interface ChipProps {
  label: string;
  fontColor: 'gray' | 'primary';
  backgroundColor: 'gray' | 'primary100' | 'primary200';
  shape: 'rectangular' | 'rounded';
  outline?: boolean;
}

const Chip = ({
  label,
  fontColor,
  backgroundColor,
  shape,
  outline = false,
}: ChipProps) => {
  return (
    <button
      className={styles.chipVariants({
        fontColor,
        backgroundColor,
        shape,
        outline,
      })}
    >
      {label}
    </button>
  );
};

export default Chip;
