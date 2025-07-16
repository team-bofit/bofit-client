import * as styles from './graph.css';

interface GraphProps {
  detailItem?: string;
  average?: number;
  current?: number;
}

const TYPE = {
  BELOW: 'below',
  AVERAGE: 'average',
  ABOVE: 'above',
} as const;

const Graph = ({ average, current, detailItem }: GraphProps) => {
  const value =
    typeof current !== 'number' || typeof average !== 'number'
      ? TYPE.AVERAGE
      : current < average
        ? TYPE.BELOW
        : current > average
          ? TYPE.ABOVE
          : TYPE.AVERAGE;

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
        <div className={styles.averageContainer}>
          <span className={styles.dot} aria-hidden="true" />
          <p className={styles.averageAmount}>평균 {average}만원</p>
        </div>
      </div>
    </div>
  );
};

export default Graph;
