import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Chip, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import FeedListItem from '@widgets/community/components/feed-list-item/feed-list-item';
import { CATEGORIES } from '@widgets/community/constant/category';
import { EMPTY_POST } from '@widgets/community/constant/empty-content';
import { SORTS } from '@widgets/community/constant/list-sort';
import { CategoryValue } from '@widgets/community/types/category-type';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';

import FilterDropDown from '../filter-dropdown/filter-dropdown';

import * as styles from './feed-list.css';
import { virtualRef } from '@widgets/mypage/components/preview/preview.css';

type SortType = (typeof SORTS)[number];

const FeedList = () => {
  const [sort, setSort] = useState<SortType>(SORTS[0]);
  const [category, setCategory] = useState<CategoryValue>(CATEGORIES[0].value);
  const navigate = useNavigate();

  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...COMMUNITY_QUERY_OPTIONS.POSTS(sort.value, category),
    });

  const handleSort = (newSort: SortType) => {
    setSort(newSort);
  };

  const handleCategory = (newCategory: CategoryValue) => {
    setCategory(newCategory);
  };

  return (
    <section className={styles.listAllContainer}>
      <section className={styles.chipContainer}>
        {CATEGORIES.map((CATEGORY) => (
          <div key={CATEGORY.value}>
            <Chip
              label={CATEGORY.label}
              fontColor="gray"
              backgroundColor={
                category === CATEGORY.value ? 'primary100' : 'gray'
              }
              shape="rounded"
              onClick={() => handleCategory(CATEGORY.value)}
            />
          </div>
        ))}
      </section>
      <div className={styles.listContentsContainer}>
        <FilterDropDown
          optionTitle={sort.label}
          rightIcon={<Icon name="caret_down_sm" />}
          isIconRotate={true}
        >
          {SORTS.map((SORT) => (
            <TextButton
              key={SORT.value}
              size="sm"
              color={sort.value === SORT.value ? 'primary' : 'black'}
              onClick={() => handleSort(SORT)}
            >
              {SORT.label}
            </TextButton>
          ))}
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
