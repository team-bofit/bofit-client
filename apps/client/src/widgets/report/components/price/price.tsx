import * as styles from './price.css';

interface PriceProps {
  price: number; // TODO 명세 필드명 반영
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
