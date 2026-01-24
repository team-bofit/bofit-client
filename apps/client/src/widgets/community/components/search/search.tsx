import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';

import { Chip, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { LocalStorage } from '@widgets/community/utils/local-storage';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { routePath } from '@shared/router/path';

import FeedListItem from '../feed-list-item/feed-list-item';

import * as styles from './search.css';

const LOCAL_STORAGE_KEY = 'recentSearch';

const Search = () => {
  const [params, setParams] = useSearchParams();
  const keyword = params.get('keyword') ?? '';
  const [inputValue, setInputValue] = useState<string>(() => keyword);

  const { getLocalStorage, addLocalStorage, deleteLocalStorage } =
    LocalStorage(LOCAL_STORAGE_KEY);
  const [recentSearch, setRecentSearch] = useState<string[]>(getLocalStorage());
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...COMMUNITY_QUERY_OPTIONS.SEARCH(keyword),
      enabled: !!keyword,
    });

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) {
      return;
    }
    const submitValue = inputValue.trim();
    if (!submitValue) {
      return;
    }
    setParams({ keyword: submitValue });
    addLocalStorage(submitValue);
    setRecentSearch(getLocalStorage());
  };

  const handleDelete = (history: string) => {
    deleteLocalStorage(history);
    setRecentSearch(getLocalStorage());
  };

  const handleRecentSearch = (history: string) => {
    setParams({ keyword: history });
    setInputValue(history);
    addLocalStorage(history);
    setRecentSearch(getLocalStorage());
  };

  const handleGoToDetail = (postId: number | undefined) => {
    navigate(routePath.COMMUNITY_DETAIL.replace(':postId', String(postId)));
  };

  const feedObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const searchPosts = data?.pages.flatMap((p) => p?.data?.content || []) ?? [];

  return (
    <section className={styles.searchAllContainer}>
      <Input
        value={inputValue}
        placeholder={'"보험추천"을 입력해보세요'}
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDown}
        bgColor="background"
        icon={<Icon name="search" color="gray300" />}
        hasClearButton
      />
      <div className={styles.searchHistoryContainer}>
        {recentSearch.length > 0 && (
          <p className={styles.searchHistoryTitle}>최근 검색어</p>
        )}
        <div className={styles.chipContainer}>
          {recentSearch.map((history: string) => (
            <Chip
              onClick={() => handleRecentSearch(history)}
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
      {searchPosts.length > 0 ? (
        searchPosts.map((post) => (
          <FeedListItem
            key={post.postId}
            title={post.title}
            text={post.content}
            writerNickname={post.writerNickname}
            createdAt={post.createdAt}
            commentCount={post.commentCount}
            isLiked={post.likedByCurrentUser}
            likeCount={post.likeCount}
            profileImageUrl={post.profileImageUrl ?? ''}
            onClick={() => handleGoToDetail(post.postId)}
          />
        ))
      ) : (
        <></>
      )}
      <div ref={feedObserverRef} className={styles.virtualRef} />
    </section>
  );
};

export default Search;
