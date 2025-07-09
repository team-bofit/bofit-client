import { HTMLAttributes, ReactNode } from 'react';

import * as styles from './tip.css.ts';

interface TipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  contents: ReactNode;
  variant?: 'green' | 'gray';
  onClick?: VoidFunction;
}

const Tip = ({
  title,
  contents,
  variant = 'green',
  onClick,
  ...props
}: TipProps) => {
  return (
    <div
      className={styles.tipContainer({ variant })}
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
