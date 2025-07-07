import * as styles from './button.css';

interface ButtonProps {
  text: string;
  size: 'sm' | 'lg';
  subText?: string;
  selected?: boolean;
}

const Button = ({
  text,
  subText,
  selected = false,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button className={styles.buttonVariants({ selected, size })} {...props}>
      <span className={styles.textVariants({ size })}>{text}</span>
      {subText && <span className={styles.subText}>{subText}</span>}
    </button>
  );
};

export default Button;
