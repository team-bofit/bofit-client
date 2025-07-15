import { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Alert, Floating, Navigation } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import DetailComment from '@widgets/community/components/detail-comment/detail-comment';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import { ALERT_CONTENT_BODY } from '@widgets/community/constant/alert-content';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import {
  communityListResponse,
  getPosts,
} from '@shared/api/domain/community/queries';
import { POSTS_QUERY_KEY } from '@shared/constants/query-key';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
// import { POSTS_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { routePath } from '@shared/router/path';

import * as styles from './community-page.css';

const CommunityPage = () => {
  const navigate = useNavigate();

  const observeRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<communityListResponse>({
      queryKey: POSTS_QUERY_KEY.POSTS(),
      queryFn: ({ pageParam = 0 }) =>
        getPosts({ pageParam: pageParam as number }),
      getNextPageParam: (lastPage) => {
        ``;
        if (lastPage?.isLast) {
          return undefined;
        }
        return lastPage?.nextCursor ?? undefined;
      },
      initialPageParam: 0,
    });

  useIntersectionObserver(
    observeRef,
    () => {
      console.log('🔥 바닥에 닿았습니다!');

      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage,
  );

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
      <article className={styles.mapCommunityListContainer} ref={observeRef}>
        {data?.pages.some((page) => page.data?.content?.length > 0) ? (
          data.pages
            .flatMap((page) => page.data?.content ?? [])
            .map((post) => (
              <DetailComment
                key={post.postId}
                title={post.title}
                text={post.content}
                writerNickname={post.writerNickname}
                createdAt={post.createdAt}
                commentNum={post.commentCount}
                onClick={() => navigate(`/community/detail/${post.postId}`)}
              />
            ))
        ) : (
          <div className={styles.emptyPlaceholder}>
            <EmptyPlaceholder content={EMPTY_POST} />
          </div>
        )}
        <div ref={observeRef} />
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
