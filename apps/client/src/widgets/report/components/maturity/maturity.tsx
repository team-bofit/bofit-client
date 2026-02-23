import * as styles from './maturity.css';

interface MaturityProps {
  age: number;
}

const Maturity = ({ age }: MaturityProps) => {
  return (
    <div className={styles.maturityContainer}>
      <p>만기</p>
      <p>{age}세</p>
    </div>
  );
};

export default Maturity;
