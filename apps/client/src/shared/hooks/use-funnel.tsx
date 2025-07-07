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

export const useFunnel = (steps: string[], completePath: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 현재 단계 슬러그(문자열)와 인덱스(숫자)
  const stepSlug = searchParams.get('step') || steps[0];
  const currentIndex = steps.indexOf(stepSlug);

  // 이동 함수 (앞/뒤)
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

  // Step: children만 보여줌
  const Step = useCallback(({ children }: StepProps) => <>{children}</>, []);

  // Funnel: 현재 단계에 해당하는 Step만 렌더
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
