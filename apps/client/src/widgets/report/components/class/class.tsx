import { useCallback } from 'react';

import * as styles from './class.css';

const LABEL_MAP = {
  average: '평균',
  guarantee: '보장',
} as const;

const classNames = ['1종', '2종', '3종', '4종', '5종'];

interface ClassProps {
  // TODO: 추후 OpenAPI 스키마로 타입 변경
  averageValues: number[];
  guaranteeValues: number[];
}

interface RowProps {
  type: 'average' | 'guarantee';
  values: number[];
  getClassName?: (value: number, index: number) => string;
}

const getGuaranteeClassName = (
  guaranteeValue: number,
  averageValue: number,
) => {
  const variant = guaranteeValue >= averageValue ? 'above' : 'below';
  return styles.guaranteeNumber({ type: variant });
};

const Row = ({ type, values, getClassName }: RowProps) => {
  const labelClass =
    type === 'average' ? styles.avgLabel : styles.guaranteeLabel;

  return (
    <>
      <div className={labelClass}>{LABEL_MAP[type]}</div>
      {values.map((value, idx) => (
        <div
          key={`${type}-${idx}`}
          className={getClassName ? getClassName(value, idx) : styles.avgNumber}
        >
          {value}
        </div>
      ))}
    </>
  );
};

const Class = ({ averageValues, guaranteeValues }: ClassProps) => {
  const getClassNameByGuarantee = useCallback(
    (guaranteeValue: number, index: number) => {
      return getGuaranteeClassName(guaranteeValue, averageValues[index]);
    },
    [averageValues],
  );

  return (
    <section className={styles.container}>
      <p className={styles.unit}>단위:만 원</p>
      <article className={styles.classContainer}>
        <div className={styles.grid}>
          <div />
          {classNames.map((className) => (
            <div key={className} className={styles.classLabel}>
              {className}
            </div>
          ))}
          <Row type="average" values={averageValues} />
          <Row
            type="guarantee"
            values={guaranteeValues}
            getClassName={getClassNameByGuarantee}
          />
        </div>
      </article>
    </section>
  );
};

export default Class;
