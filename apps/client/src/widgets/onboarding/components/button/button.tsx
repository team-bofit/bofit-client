import * as styles from './button.css';

interface ButtonProps {
  text: string;
  subText?: string;
  selected?: boolean;
}

const Button = ({ text, subText, selected = false, ...props }: ButtonProps) => {
  return (
    <button className={styles.buttonVariants({ selected })} {...props}>
      <span className={styles.text}>{text}</span>
      {subText && <span className={styles.subText}>{subText}</span>}
    </button>
  );
};

export default Button;
