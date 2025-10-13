import { formatPrice } from '@shared/utils/utils';

import * as styles from './price.css';

interface PriceProps {
  price: number;
}

const MONTH = '월';
const WON = '원';

const Price = ({ price }: PriceProps) => {
  const formattedPrice = formatPrice(price);

  return (
    <div className={styles.priceContainer}>
      <p className={styles.month}>{MONTH}</p>
      <p className={styles.price}>{formattedPrice}</p>
      <p>{WON}</p>
    </div>
  );
};

export default Price;
