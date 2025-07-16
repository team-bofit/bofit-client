import { HTMLAttributes, ReactNode } from 'react';

import * as styles from './tip.css.ts';

interface TipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  contents: ReactNode;
  bgColor?: 'green' | 'gray';
  onClick?: VoidFunction;
}

/**
 * Tip 컴포넌트는 홈화면에서 보험 관련 정보를 제공하는 팁을 표시합니다.
 * @param title 보험 tip 제목
 * @param contents 보험 tip 내용
 * @param variant 팁의 색상 변형 (기본값: 'green')
 * @param onClick 팁 클릭 시 실행되는 함수
 * @param props 기타 HTML 속성
 */
const Tip = ({
  title,
  contents,
  bgColor = 'green',
  onClick,
  ...props
}: TipProps) => {
  return (
    <div
      className={styles.tipContainer({ bgColor })}
      onClick={onClick}
      {...props}
    >
      <p className={styles.tipTitle}>{title}</p>
      <p className={styles.tipContents}>{contents}</p>
      <div className={styles.backgroundImage}>
        <img
          src="./glass_icon_bulb.svg"
          className={styles.bulbSvg}
          alt="Bulb icon"
        />
      </div>
    </div>
  );
};

export default Tip;
