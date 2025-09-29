import { useState } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Chip, TextButton } from '@bds/ui';
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

const CATEGORIES = [
  { key: 'ALL', label: '전체' },
  { key: 'QNA', label: '보험 QnA' },
  { key: 'INFORMATION', label: '정보공유' },
  { key: 'CONVERSATION', label: '사담' },
] as const;

const SORT = {
  LATEST: '최신순',
  POPULAR: '인기순',
};
type SortType = typeof SORT.LATEST | typeof SORT.POPULAR;

const FeedList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FeedListProps) => {
  const [sort, setSort] = useState<SortType>('최신순');
  const navigate = useNavigate();
  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const handleCategory = (newCategory: SortType) => {
    setSort(newCategory);
  };

  return (
    <section className={styles.listAllContainer}>
      <section className={styles.chipContainer}>
        {CATEGORIES.map((CATEGORY) => (
          <div key={CATEGORY.key}>
            <Chip
              label={CATEGORY.label}
              fontColor="gray"
              backgroundColor="gray"
              shape="rounded"
            />
          </div>
        ))}
      </section>
      <div className={styles.listContentsContainer}>
        <FilterDropDown
          optionTitle={sort}
          rightIcon={<Icon name="caret_down_sm" />}
          isIconRotate={true}
        >
          <TextButton
            size="sm"
            color={sort === SORT.LATEST ? 'primary' : 'black'}
            onClick={() => handleCategory(SORT.LATEST)}
          >
            {SORT.LATEST}
          </TextButton>
          <TextButton
            size="sm"
            color={sort === SORT.POPULAR ? 'primary' : 'black'}
            onClick={() => handleCategory(SORT.POPULAR)}
          >
            {SORT.POPULAR}
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
      </div>
    </section>
  );
};

export default FeedList;
