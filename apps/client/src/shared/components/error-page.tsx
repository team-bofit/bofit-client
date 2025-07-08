import { useRouteError } from 'react-router';

/** 임시 에러 페이지입니다. @TODO 추후 연결 필요 */
export function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <p style={{ textAlign: 'center' }}>
      <h1>페이지에 문제가 발생했습니다</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        요청하신 페이지를 불러오는 중 오류가 발생했습니다.
      </p>
      <p>에러 상세 정보</p>
      {error?.message || '알 수 없는 오류'}
    </p>
  );
}
