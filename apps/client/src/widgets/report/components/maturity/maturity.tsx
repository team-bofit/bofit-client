import * as styles from './maturity.css';

interface MaturityProps {
  age: number; // api 연동
}

const MATURITY = '만기';
const AGELABEL = '세';

const Title = ({ age }: MaturityProps) => {
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

export default Title;
