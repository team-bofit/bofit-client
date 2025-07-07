import * as styles from './graph.css';

interface GraphProps {
  value: 'below' | 'average' | 'above';
  detailItem?: string;
  average: number;
  current: number;
}
const Graph = ({ value, average, current, detailItem }: GraphProps) => {
  return (
    <div className={styles.container}>
      {detailItem && <p className={styles.detailItemText}>{detailItem}</p>}
      <div className={styles.graphExplainContainer}>
        <div className={styles.textContainer({ value })}>
          <p className={styles.guaranteeAmountText}>보장 금액</p>
          <p className={styles.currentAmount}>{current}만원</p>
        </div>
        <div className={styles.graphBar}>
          <div className={styles.graphProgressBar({ value })} />
        </div>
        <p className={styles.averageAmount}>평균 {average}만원</p>
      </div>
    </div>
  );
};

export default Graph;
