import * as styles from './price.css';

interface PriceProps {
  price: number; // api 연동
}

const MONTH = '월';
const WON = '원';

const Title = ({ price }: PriceProps) => {
  return (
    <div className={styles.priceContainer}>
      <p className={styles.month}>{MONTH}</p>
      <p className={styles.price}>{price}</p>
      <p>{WON}</p>
    </div>
  );
};

export default Title;
