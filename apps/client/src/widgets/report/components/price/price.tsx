import { formatPrice } from '@shared/utils/utils';

import * as styles from './price.css';

interface PriceProps {
  price: number;
}

const Price = ({ price }: PriceProps) => {
  const formattedPrice = formatPrice(price);

  return (
    <div className={styles.priceContainer}>
      <p className={styles.month}>월</p>
      <p className={styles.price}>{formattedPrice}</p>
      <p>원</p>
    </div>
  );
};

export default Price;
