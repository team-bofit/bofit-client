import { useNavigate } from 'react-router';

import { Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import Body from '@widgets/mypage/body';

import { routePath } from '@shared/router/path';

import { useQuery } from '@tanstack/react-query';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';

const MyPage = () => {
  const { data: userData } = useQuery(USER_QUERY_OPTIONS.PROFILE());
  console.log(userData);

  return <div>MyPage</div>;
};

export default MyPage;
