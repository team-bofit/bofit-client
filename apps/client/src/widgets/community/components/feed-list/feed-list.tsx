import { InfiniteData } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import FeedListItem from '@widgets/community/components/feed-list-item/feed-list-item';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import { FeedPreviewResponse } from '@shared/api/types/types';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';

import * as styles from './feed-list.css';
import { virtualRef } from '@widgets/mypage/preview.css';

interface FeedListProps {
  data?: InfiniteData<FeedPreviewResponse>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const FeedList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FeedListProps) => {
  const navigate = useNavigate();
  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);
  return (
    <section className={styles.mapCommunityListContainer}>
      {data?.pages.some((page) => (page?.content ?? []).length > 0) ? (
        data.pages
          .flatMap((page) => page?.content ?? [])
          .map((post) => (
            <FeedListItem
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
        <div className={styles.placeholder}>
          <div className={styles.emptyPlaceholder}>
            <EmptyPlaceholder content={EMPTY_POST} />
          </div>
        </div>
      )}
      <div ref={feedObserverRef} className={virtualRef} />
    </section>
  );
};

export default FeedList;
