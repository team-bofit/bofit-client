import * as styles from './graph.css';

interface GraphProps {
  detailItem?: string;
  average: number;
  current: number;
}

const TYPE = {
  BELOW: 'below',
  AVERAGE: 'average',
  ABOVE: 'above',
} as const;

type ValueType = (typeof TYPE)[keyof typeof TYPE];

const Graph = ({ average, current, detailItem }: GraphProps) => {
  let value: ValueType = TYPE.AVERAGE;

  if (current < average) {
    value = TYPE.BELOW;
  } else if (current > average) {
    value = TYPE.ABOVE;
  }

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
