import * as styles from './maturity.css';

interface MaturityProps {
  age: number; // TODO 명세 필드명 반영
}

const MATURITY = '만기';
const AGELABEL = '세';

const Maturity = ({ age }: MaturityProps) => {
  return (
    <div className={styles.maturityContainer}>
      <p>{MATURITY}</p>
      <p>
        {age}
        {AGELABEL}
      </p>
    </div>
  );
};

export default Maturity;
