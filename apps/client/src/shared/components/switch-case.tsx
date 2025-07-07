import { ReactElement } from 'react';

/**
 * 주어진 타입 T를 문자열로 변환한 타입입니다.
 *
 * - T가 boolean이면 'true' 또는 'false'
 * - T가 number이면 `${number}` 형태의 문자열 리터럴
 * - T가 string이면 그대로 string
 */
type StringifiedValue<T> =
  | (T extends boolean ? 'true' | 'false' : never)
  | (T extends number ? `${T}` : never)
  | (T extends string ? T : never);

/**
 * SwitchCase 컴포넌트에 전달할 props 타입입니다.
 *
 * @typeParam Case 비교할 값의 타입입니다.
 * @property value 현재 비교할 값입니다.
 * @property caseBy 값에 따라 렌더링할 컴포넌트를 매핑한 객체입니다.
 * @property defaultComponent 일치하는 case가 없을 때 렌더링할 기본 컴포넌트입니다.
 */
type Props<Case> = {
  value: Case;
  caseBy: Partial<{ [P in StringifiedValue<Case>]: () => ReactElement | null }>;
  defaultComponent?: () => ReactElement | null;
};

/**
 * SwitchCase 컴포넌트
 *
 * 주어진 `value`를 문자열로 변환한 뒤,
 * `caseBy`에서 일치하는 키가 있으면 해당 컴포넌트를 렌더링합니다.
 * 일치하는 케이스가 없으면 `defaultComponent`를 렌더링합니다.
 *
 * @typeParam Case 비교할 값의 타입입니다.
 * @param props value, caseBy, defaultComponent를 포함한 props 객체입니다.
 * @returns 조건에 맞는 ReactElement 또는 null
 *
 * @example
 * ```tsx
 * <SwitchCase
 *   value={true}
 *   caseBy={{
 *     true: () => <div>참입니다</div>,
 *     false: () => <div>거짓입니다</div>,
 *   }}
 *   defaultComponent={() => <div>일치하는 값이 없습니다</div>}
 * />
 *
 */
export function SwitchCase<Case>({
  value,
  caseBy,
  defaultComponent = () => null,
}: Props<Case>): ReactElement | null {
  const stringifiedValue = String(value) as StringifiedValue<Case>;
  return (caseBy[stringifiedValue] ?? defaultComponent)();
}
