import { LoaderFunctionArgs, redirect } from 'react-router';

import { isPostAuthor } from '@widgets/community/utils/is-post-author';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { USER_QUERY_OPTIONS } from '@shared/api/domain/queries';
import { routePath } from '@shared/router/path';
import { queryClient } from '@shared/utils/query-client';

export const communityEditLoader = async ({ params }: LoaderFunctionArgs) => {
  const postId = params.postId;

  if (!postId) {
    throw new Error('글 수정 페이지에서 postId를 찾을 수 없습니다.');
  }

  const [feedDetailData, userData] = await Promise.all([
    queryClient.ensureQueryData(COMMUNITY_QUERY_OPTIONS.FEED_DETAIL(postId)),
    queryClient.ensureQueryData(USER_QUERY_OPTIONS.PROFILE()),
  ]);

  if (!isPostAuthor(feedDetailData?.writerId, userData?.data?.userId)) {
    return redirect(routePath.COMMUNITY_DETAIL.replace(':postId', postId));
  }

  return null;
};
