import { useQuery } from '@tanstack/react-query';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';

const MyPage = () => {
  const { data: userData } = useQuery(USER_QUERY_OPTIONS.PROFILE());
  console.log(userData);

  return <div>MyPage</div>;
};

export default MyPage;
