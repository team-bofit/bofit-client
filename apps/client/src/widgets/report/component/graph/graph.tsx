import * as styles from './graph.css';

const Graph = () => {
  return (
    <div className={styles.container}>
      <p className={styles.detailItemText}>세부항목</p>
      <div className={styles.graphExplainContainer}>
        <p className={styles.guaranteeAmountText}>보장 금액</p>
        <div className={styles.graphBar}>
          <div className={styles.graphProgressBar} />
        </div>
        <p className={styles.averageAmountText}>평균 20만원</p>
      </div>
    </div>
  );
};

export default Graph;
