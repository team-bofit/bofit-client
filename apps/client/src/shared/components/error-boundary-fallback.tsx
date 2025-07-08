interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div>
      {/* @TODO ErrorFallback 컴포넌트 연결 */}
      ErrorFallback 컴포넌트 / 에러 상세 정보 {error.message}
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}
