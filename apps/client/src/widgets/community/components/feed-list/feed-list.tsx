import { useState } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import FeedListItem from '@widgets/community/components/feed-list-item/feed-list-item';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';

import { FeedPreviewResponse } from '@shared/api/types/types';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';

import FilterDropDown from '../filter-dropdown/filter-dropdown';

import * as styles from './feed-list.css';
import { virtualRef } from '@widgets/mypage/components/preview/preview.css';

interface FeedListProps {
  data?: InfiniteData<FeedPreviewResponse>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const latestCategory = '최신순';
const popularCategory = '인기순';

type categoryType = '최신순' | '인기순';

const FeedList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FeedListProps) => {
  const [category, setCategory] = useState<categoryType>('최신순');
  const navigate = useNavigate();
  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const handleCategory = (newCategory: categoryType) => {
    setCategory(newCategory);
  };

  return (
    <section className={styles.listContentsContainer}>
      <FilterDropDown
        optionTitle={category}
        rightIcon={<Icon name="caret_down_sm" />}
        isIconRotate={true}
      >
        <TextButton
          size="sm"
          color={category === latestCategory ? 'primary' : 'black'}
          onClick={() => handleCategory(latestCategory)}
        >
          {latestCategory}
        </TextButton>
        <TextButton
          size="sm"
          color={category === popularCategory ? 'primary' : 'black'}
          onClick={() => handleCategory(popularCategory)}
        >
          {popularCategory}
        </TextButton>
      </FilterDropDown>
      <div className={styles.listContainer}>
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
      </div>
    </section>
  );
};

export default FeedList;
