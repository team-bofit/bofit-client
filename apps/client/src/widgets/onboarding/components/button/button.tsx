import * as styles from './button.css';

interface ButtonProps {
  text: string;
  subText?: string;
  selected: boolean;
}

const Button = ({ text, subText, selected, ...props }: ButtonProps) => {
  return (
    <button className={styles.buttonVariants({ selected })} {...props}>
      <p className={styles.text}>{text}</p>
      {subText && <p className={styles.subText}>{subText}</p>}
    </button>
  );
};

export default Button;
