import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import * as styles from './slider.css';

interface SliderProps {
  min: number;
  max: number;
  defaultValue: [number, number];
  value?: [number, number];
  step?: number;
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * Slider 컴포넌트는 주어진 범위 내에서 값을 선택할 수 있는 슬라이더 UI를 제공합니다.
 * @param minValue - 슬라이더의 최솟값
 * @param maxValue - 슬라이더의 최댓값
 * @param defaultValue - 초기값 (uncontrolled 컴포넌트일 때)
 * @param value - 현재값 (controlled 컴포넌트일 때)
 * @param step - 단계값
 * @param onChange - 값 변경 콜백
 * @param disabled - 비활성화 여부
 * @param aria-label - 접근성을 위한 레이블
 * @author @minjeoong
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Slider min={0} max={100} defaultValue={[20, 80]} />
 *
 * // Controlled
 * <Slider
 *   min={0}
 *   max={100}
 *   value={[minVal, maxVal]}
 *   onChange={([min, max]) => setValue([min, max])}
 * />
 * ```
 */

const Slider = ({
  min,
  max,
  defaultValue = [min, max],
  value,
  step = 1,
  onChange,
  disabled = false,
  'aria-label': ariaLabel = 'Range slider',
}: SliderProps) => {
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = useState<[number, number]>(defaultValue);

  const rangeRef = useRef<HTMLDivElement>(null);

  const currentValue = isControlled ? value : localValue;
  const [minVal, maxVal] = currentValue;

  const valueToPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  // 트랙 스타일 업데이트
  useEffect(() => {
    if (!rangeRef.current || minVal === undefined || maxVal === undefined) {
      return;
    }

    const minPercent = valueToPercent(minVal);
    const maxPercent = valueToPercent(maxVal);

    rangeRef.current.style.left = `${minPercent}%`;
    rangeRef.current.style.width = `${maxPercent - minPercent}%`;
  }, [minVal, maxVal, valueToPercent]);

  const updateValue = useCallback(
    (newValue: [number, number]) => {
      if (!isControlled) {
        setLocalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const handleMinChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || maxVal === undefined) {
        return;
      }

      const newMin = Number(e.target.value);
      const validMin = Math.min(newMin, maxVal - step);
      updateValue([validMin, maxVal]);
    },
    [maxVal, step, disabled, updateValue],
  );

  const handleMaxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || minVal === undefined) {
        return;
      }

      const newMax = Number(e.target.value);
      const validMax = Math.max(newMax, minVal + step);
      updateValue([minVal, validMax]);
    },
    [minVal, step, disabled, updateValue],
  );

  return (
    <div className={styles.SliderContainer} role="group" aria-label={ariaLabel}>
      <div className={styles.sliderLabels}>
        <span className={styles.sliderLabel}>{min}만원</span>
        <span className={styles.sliderLabel}>{max}만원</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        disabled={disabled}
        className={styles.thumb}
        aria-label={`Minimum value: ${minVal}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        disabled={disabled}
        className={`${styles.thumb} ${styles.thumbMax}`}
        aria-label={`Maximum value: ${maxVal}`}
      />

      <div className={styles.sliderTrack} />
      <div ref={rangeRef} className={styles.sliderRange} />
    </div>
  );
};

export default Slider;
