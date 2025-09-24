import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as styles from './chip.css';

interface BaseChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fontColor?: 'gray800' | 'error' | 'bofitOrange' | 'primary600';
  backgroundColor?: 'whiteBackground' | 'primary100' | 'primary200';
  onDelete?: () => void;
}

interface RoundChipProps extends BaseChipProps {
  variant: 'round';
  size?: 'small' | 'large';
}

interface SquareChipProps extends BaseChipProps {
  variant: 'square';
  size?: 'small' | 'medium';
}

type ChipProps = RoundChipProps | SquareChipProps;

const Chip = ({
  label,
  variant,
  size,
  active,
  leftIcon,
  rightIcon,
  fontColor,
  backgroundColor,
  onDelete,
  onClick,
  ...props
}: ChipProps) => {
  return (
    <button
      {...props}
      className={styles.chipVariants({
        variant,
        size,
        active,
        fontColor,
        backgroundColor,
      })}
      onClick={onClick}
    >
      {leftIcon && (
        <span
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          {leftIcon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {rightIcon && (
        <span
          className={styles.icon}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Chip;
