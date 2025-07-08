import { useCallback } from 'react';
import { Children } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface StepProps {
  name: string;
  children: ReactNode;
}

interface FunnelProps {
  children: ReactElement<StepProps>[];
}

/**
 * 다단계(스텝) 화면 구성을 위한 커스텀 훅입니다.
 * 쿼리스트링 기반으로 현재 스텝을 추적하며, 앞/뒤 스텝 전환 및 조건부 렌더링을 도와줍니다.
 *
 * @param steps - 스텝을 식별할 문자열 배열. 각 스텝은 쿼리스트링의 `step` 파라미터로 사용됩니다.
 * @param completePath - 마지막 스텝 이후 이동할 경로. 예: 제출 완료 페이지 등.
 *
 * @returns
 * - `Funnel`: 현재 스텝에 해당하는 컴포넌트만 렌더링하는 컴포넌트
 * - `Step`: 스텝 정의용 컴포넌트 래퍼
 * - `go`: 스텝 이동 함수. `go(1)`은 다음 스텝, `go(-1)`은 이전 스텝으로 이동
 * - `currentStep`: 현재 스텝의 문자열 식별자
 * - `currentIndex`: 현재 스텝의 인덱스 (0부터 시작)
 * - `steps`: 전달받은 전체 스텝 배열
 *
 * @example
 * ```tsx
 * const {
 *   Funnel,
 *   Step,
 *   go,
 *   currentStep,
 *   currentIndex,
 * } = useFunnel(['start', 'info', 'confirm'], '/complete');
 *
 * return (
 *   <Funnel>
 *     <Step name="start">시작 페이지</Step>
 *     <Step name="info">정보 입력</Step>
 *     <Step name="confirm">확인</Step>
 *   </Funnel>
 * );
 * ```
 */

export const useFunnel = (steps: string[], completePath: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const stepSlug = searchParams.get('step') || steps[0];
  const currentIndex = steps.indexOf(stepSlug);

  const go = useCallback(
    (offset: number) => {
      const nextIndex = currentIndex + offset;
      if (nextIndex < 0) {
        navigate(-1);
      } else if (nextIndex >= steps.length) {
        navigate(completePath);
      } else {
        setSearchParams({ step: steps[nextIndex] }, { replace: true });
      }
    },
    [currentIndex, steps, setSearchParams, navigate, completePath],
  );

  const Step = useCallback(({ children }: StepProps) => <>{children}</>, []);

  const Funnel = useCallback(
    ({ children }: FunnelProps) => {
      const childrenArray = Children.toArray(
        children,
      ) as ReactElement<StepProps>[];
      const target = childrenArray.find(
        (child) => child.props.name === stepSlug,
      );
      return <>{target}</>;
    },
    [stepSlug],
  );

  return {
    Funnel,
    Step,
    go,
    currentStep: stepSlug,
    currentIndex,
    steps,
  };
};
