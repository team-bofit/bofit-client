import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import * as styles from './slider.css';

interface SliderProps {
  minValue: number;
  maxValue: number;
  defaultValue: number[];
  value?: number[];
  step?: number;
  onChange?: (value: number[]) => void;
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
 */

const Slider = ({
  minValue,
  maxValue,
  defaultValue = [minValue, maxValue],
  value,
  step = 1,
  onChange,
  disabled = false,
  'aria-label': ariaLabel = 'Range slider',
}: SliderProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number[]>(defaultValue);

  const rangeRef = useRef<HTMLDivElement>(null);

  const getCurrentValue = useCallback((): number[] => {
    if (isControlled && isValidNumberArray(value)) {
      return value;
    }
    return internalValue;
  }, [isControlled, value, internalValue]);

  const currentValue = getCurrentValue();
  const [currentMinVal, currentMaxVal] = currentValue;

  useEffect(() => {
    if (isControlled && isValidNumberArray(value)) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  const getPercent = useCallback(
    (val: number) => ((val - minValue) / (maxValue - minValue)) * 100,
    [minValue, maxValue],
  );

  // 값이 유효한 number 배열인지 확인하는 함수
  const isValidNumberArray = (arr: any): arr is number[] => {
    return (
      Array.isArray(arr) &&
      arr.length === 2 &&
      arr.every((item) => typeof item === 'number' && !isNaN(item))
    );
  };

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(currentMinVal || minValue);
      const maxPercent = getPercent(currentMaxVal || maxValue);
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [currentMinVal, currentMaxVal, getPercent]);

  const updateValue = useCallback(
    (newValue: number[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const handleMinChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || currentMaxVal === undefined) {
        return;
      }

      const val = Math.min(Number(e.target.value), currentMaxVal - step);
      updateValue([val, currentMaxVal]);
    },
    [currentMaxVal, disabled, step, updateValue],
  );

  const handleMaxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || currentMinVal === undefined) {
        return;
      }

      const val = Math.max(Number(e.target.value), currentMinVal + step);
      updateValue([currentMinVal, val]);
    },
    [currentMinVal, disabled, step, updateValue],
  );

  return (
    <div className={styles.SliderContainer} role="group" aria-label={ariaLabel}>
      <div className={styles.sliderLabels}>
        <span className={styles.sliderLabel}>{minValue}</span>
        <span className={styles.sliderLabel}>{maxValue}</span>
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={step}
        value={currentMinVal}
        onChange={handleMinChange}
        disabled={disabled}
        className={styles.thumb}
        aria-label={`Minimum value: ${currentMinVal}`}
      />
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={step}
        value={currentMaxVal}
        onChange={handleMaxChange}
        disabled={disabled}
        className={`${styles.thumb} ${styles.thumbMax}`}
        aria-label={`Maximum value: ${currentMaxVal}`}
      />

      <div className={styles.sliderTrack} />
      <div ref={rangeRef} className={styles.sliderRange} />
    </div>
  );
};

export default Slider;
