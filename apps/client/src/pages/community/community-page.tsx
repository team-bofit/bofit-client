import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Alert, Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import DetailComment from '@widgets/community/components/detail-comment/detail-comment';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert-content';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { routePath } from '@shared/router/path';

import * as styles from './community-page.css';
import { virtualRef } from '@widgets/mypage/preview.css';

const CommunityPage = () => {
  const navigate = useNavigate();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...COMMUNITY_QUERY_OPTIONS.POSTS(),
      getNextPageParam: (lastPage) =>
        lastPage?.isLast ? undefined : lastPage?.nextCursor,
      initialPageParam: 0,
    });

  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const onClickWrite = () => {
    navigate(routePath.COMMUNITY_WRITE);
  };

  const onClickHome = () => {
    navigate(routePath.HOME);
  };

  return (
    <div className={styles.container}>
      <Navigation
        rightIcon={<Icon name="home" onClick={onClickHome} />}
        title="커뮤니티"
      />

      <Alert
        iconName="info"
        iconSize="2.4rem"
        alertHeader={ALERT_CONTENT_BODY.HEADER}
        alertContents={ALERT_CONTENT_BODY.BODY}
        type="info"
      />
      <article className={styles.mapCommunityListContainer}>
        {data?.pages.some((page) => (page?.content ?? []).length > 0) ? (
          data.pages
            .flatMap((page) => page?.content ?? [])
            .map((post) => (
              <DetailComment
                key={post.postId}
                title={post.title}
                text={post.content}
                writerNickname={post.writerNickname}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
                profileImageUrl={post.profileImageUrl ?? ''}
                onClick={() => navigate(`/community/detail/${post.postId}`)}
              />
            ))
        ) : (
          <div className={styles.emptyPlaceholder}>
            <EmptyPlaceholder content={EMPTY_POST} />
          </div>
        )}
        <div ref={feedObserverRef} className={virtualRef} />
      </article>

      <div className={styles.bottomFloating}>
        <Floating
          icon={<Icon name="edit" width={'100%'} height={'100%'} />}
          state="default"
          onClick={onClickWrite}
        />
      </div>
    </div>
  );
};

export default CommunityPage;
