import * as styles from './class.css';

type RowType = 'average' | 'guarantee';

const LABEL_MAP: Record<RowType, string> = {
  average: '평균',
  guarantee: '보장',
};

interface ClassProps {
  data: {
    average: number[];
    guarantee: number[];
  };
}

const classNames = ['1종', '2종', '3종', '4종', '5종'];

const Class = ({ data }: ClassProps) => {
  const renderRow = (
    type: RowType,
    values: number[],
    getClassName?: (value: number, index: number) => string,
  ) => {
    const labelClass =
      type === 'average' ? styles.avgLabel : styles.guaranteeLabel;

    return (
      <>
        <div className={labelClass}>{LABEL_MAP[type]}</div>

        {values.map((value, idx) => (
          <div
            key={`${type}-${idx}`}
            className={
              getClassName ? getClassName(value, idx) : styles.avgNumber
            }
          >
            {value}
          </div>
        ))}
      </>
    );
  };

  return (
    <section className={styles.container}>
      <p className={styles.unit}>단위:만 원</p>
      <article className={styles.classContainer}>
        <div className={styles.grid}>
          {/* 첫 셀 공백 */}
          <div />

          {/* 종 라벨 */}
          {classNames.map((className) => (
            <div key={className} className={styles.classLabel}>
              {className}
            </div>
          ))}

          {/* 평균 행 */}
          {renderRow('average', data.average)}

          {/* 보장 행 */}
          {renderRow('guarantee', data.guarantee, (guarantee, idx) => {
            const avg = data.average[idx];
            const variant = guarantee >= avg ? 'above' : 'below';
            return styles.guaranteeNumber({ type: variant });
          })}
        </div>
      </article>
    </section>
  );
};

export default Class;
