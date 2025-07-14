import { Icon } from '@bds/ui/icons';

import * as styles from './slider.css';

interface SliderProps {
  minValue: number;
  maxValue: number;
  defaultValue?: number;
  value?: string[];
  step?: number;
  onChange?: (value: number) => void;
}

/**
 * Slider 컴포넌트는 주어진 범위 내에서 값을 선택할 수 있는 슬라이더 UI를 제공합니다.
 * @param minValue
 * @param maxValue
 * @param defaultValue
 * @param value
 * @param step
 * @param onChange
 * @author @minjeoong
 */

const Slider = ({
  minValue,
  maxValue,
  defaultValue,
  value,
  step,
  onChange,
}: SliderProps) => {
  return <div className={styles.SliderContainer}></div>;
};

export default Slider;
