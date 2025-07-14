import * as styles from './chip.css';

interface ChipProps {
  label: string;
  fontColor: 'gray' | 'primary';
  backgroundColor: 'gray' | 'primary100' | 'primary200';
  shape: 'rectangular' | 'rounded';
  outline?: boolean;
  zIndex?: 'auto' | 'base' | 'content' | 'overlay';
}

const Chip = ({
  label,
  fontColor,
  backgroundColor,
  shape,
  outline = false,
  zIndex,
}: ChipProps) => {
  return (
    <button
      className={styles.chipVariants({
        fontColor,
        backgroundColor,
        shape,
        outline,
        zIndex,
      })}
    >
      {label}
    </button>
  );
};

export default Chip;
