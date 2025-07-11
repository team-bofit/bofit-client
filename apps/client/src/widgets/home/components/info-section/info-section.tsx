import * as styles from './info-section.css.ts';

export const InfoSection = () => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.titleSection}>
        <p className={styles.subTitle}>OO님께 딱 맞는 보험이에요</p>
        <p className={styles.title}>OO보험사의 \n OO보험</p>
        <div className={styles.chipList}></div>
      </div>
      <div className={styles.homeChipList}></div>
    </section>
  );
};
