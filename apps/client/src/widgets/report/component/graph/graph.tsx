import * as styles from './graph.css';

interface GraphProps {
  value: 'below' | 'average' | 'above';
  average: number;
  current: number;
}
const Graph = ({ value, average, current }: GraphProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.detailItemText}>세부항목</p>
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
