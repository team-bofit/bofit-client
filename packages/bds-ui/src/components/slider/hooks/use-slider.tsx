import { RefObject, useCallback, useLayoutEffect, useReducer } from 'react';

type SliderAction =
  | { type: 'SET_MIN'; payload: number }
  | { type: 'SET_MAX'; payload: number }
  | { type: 'SET_BOTH'; payload: [number, number] };

const sliderReducer = (
  state: [number, number],
  action: SliderAction,
): [number, number] => {
  switch (action.type) {
    case 'SET_MIN':
      return [action.payload, state[1]];
    case 'SET_MAX':
      return [state[0], action.payload];
    case 'SET_BOTH':
      return action.payload;
    default:
      return state;
  }
};

/**
 * useSliderValue 훅은 슬라이더의 값을 관리하는 데 사용됩니다.
 * @param value
 * @param defaultValue
 * @param min
 * @param max
 */

export const useSliderValue = (
  value?: [number, number],
  defaultValue?: [number, number],
  min?: number,
  max?: number,
) => {
  const isControlled = value !== undefined;
  const initialValue = defaultValue || [min || 0, max || 100];

  const [state, dispatch] = useReducer(sliderReducer, initialValue);

  const currentValue = isControlled ? value : state;

  const updateValue = useCallback(
    (type: 'SET_MIN' | 'SET_MAX', newValue: number) => {
      dispatch({
        type: type,
        payload: newValue,
      });
    },
    [],
  );

  return {
    currentValue,
    updateValue,
    isControlled,
  };
};

/**
 * useTrackAnimation 훅은 슬라이더의 트랙 애니메이션을 관리합니다.
 * @param ref
 * @param minVal
 * @param maxVal
 * @param min
 * @param max
 */

export const useTrackAnimation = (
  ref: RefObject<HTMLDivElement | null>,
  minVal: number,
  maxVal: number,
  min: number,
  max: number,
) => {
  const valueToPercent = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const minPercent = valueToPercent(minVal);
    const maxPercent = valueToPercent(maxVal);

    ref.current.style.left = `${minPercent}%`;
    ref.current.style.width = `${maxPercent - minPercent}%`;
  }, [minVal, maxVal, valueToPercent, ref]);
};
