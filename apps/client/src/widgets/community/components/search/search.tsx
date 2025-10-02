import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Chip, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { EMPTY_POST } from '@widgets/community/constant/empty-content';
import { LocalStorage } from '@widgets/community/utils/local-storage';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';

import EmptyPlaceholder from '../empty-placeholder/empty-placeholder';
import FeedListItem from '../feed-list-item/feed-list-item';

import * as styles from './search.css';
const Search = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [queryValue, setQueryValue] = useState<string>('');

  const { getLocalStorage, setLocalStorage, deleteLocalStorage } =
    LocalStorage();
  const [recentSearch, setRecentSearch] = useState<string[]>(getLocalStorage());
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...COMMUNITY_QUERY_OPTIONS.SEARCH(inputValue),
      enabled: !!queryValue,
    });

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    const submitValue = inputValue.trim();
    setQueryValue(submitValue);

    if (submitValue) {
      setLocalStorage(submitValue);
      setRecentSearch(getLocalStorage());
    }
  };

  const handleDelete = (history: string) => {
    deleteLocalStorage(history);
    setRecentSearch(getLocalStorage());
  };

  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const searchPosts = data?.pages.flatMap((p) => p?.data?.content || []) ?? [];
  const hasSearchPosts = searchPosts.length > 0;

  return (
    <section className={styles.searchAllContainer}>
      <Input
        value={inputValue}
        placeholder="보험 추천을 입력해주세요"
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDown}
        bgColor="background"
        icon={<Icon name="search" color="gray300" />}
        hasClearButton={true}
      />
      <div className={styles.searchHistoryContainer}>
        <p className={styles.searchHistoryTitle}>최근 검색어</p>
        <div className={styles.chipContainer}>
          {recentSearch.map((history: string) => (
            <Chip
              key={history}
              label={history}
              variant="square"
              size="medium"
              fontColor="gray800"
              backgroundColor="whiteBackground"
              rightIcon={
                <Icon
                  name="close_sm"
                  size={24}
                  cursor="pointer"
                  onClick={() => handleDelete(history)}
                />
              }
            />
          ))}
        </div>
      </div>
      {hasSearchPosts ? (
        searchPosts.map((post) => (
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
      <div ref={feedObserverRef} className={styles.virtualRef} />
    </section>
  );
};

export default Search;
