import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { Tab } from '@bds/ui';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';

import { USER_QUERY_OPTIONS } from '@shared/api/domain/mypage/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { routePath } from '@shared/router/path';

import CommentPreview from './comment-preview';
import PostPreview from './post-preview';

import * as styles from './preview.css';

const PREVIEW_TABS = {
  POSTS: '내 글',
  COMMENTS: '내 댓글',
} as const;

type PreviewTab = (typeof PREVIEW_TABS)[keyof typeof PREVIEW_TABS];

const Preview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PreviewTab>(PREVIEW_TABS.POSTS);

  const {
    data: postData,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts,
  } = useInfiniteQuery({
    ...USER_QUERY_OPTIONS.ME_POSTS(),
    enabled: activeTab === PREVIEW_TABS.POSTS,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor,
    initialPageParam: 0,
  });

  const {
    data: commentData,
    fetchNextPage: fetchNextComments,
    hasNextPage: hasNextComments,
    isFetchingNextPage: isFetchingNextComments,
  } = useInfiniteQuery({
    ...USER_QUERY_OPTIONS.ME_COMMENTS(),
    enabled: activeTab === PREVIEW_TABS.COMMENTS,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor,
    initialPageParam: 0,
  });

  const posts = postData?.pages.flatMap((page) => page.content ?? []) ?? [];
  const comments =
    commentData?.pages.flatMap((page) => page.content ?? []) ?? [];

  const postsEnabled = activeTab === PREVIEW_TABS.POSTS && posts.length > 0;
  const commentsEnabled =
    activeTab === PREVIEW_TABS.COMMENTS && comments.length > 0;

  const postsObserverRef = useIntersectionObserver(() => {
    if (hasNextPosts && !isFetchingNextPosts) {
      fetchNextPosts();
    }
  }, postsEnabled);

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextComments && !isFetchingNextComments) {
      fetchNextComments();
    }
  }, commentsEnabled);

  // TODO: client의 generatePath를 packages에 추가하고 사용하기
  const handleNavigateDetail = (postId: number | string) => {
    navigate(routePath.COMMUNITY_DETAIL.replace(':postId', String(postId)));
  };

  return (
    <section className={styles.previewContainer}>
      <div>
        <Tab.Container
          initialValue={PREVIEW_TABS.POSTS}
          backgroundColor="white"
          onValueChange={(value) => setActiveTab(value as PreviewTab)}
        >
          <Tab.List>
            <Tab.Item value={PREVIEW_TABS.POSTS} />
            <Tab.Item value={PREVIEW_TABS.COMMENTS} />
          </Tab.List>
        </Tab.Container>
      </div>
      {activeTab === PREVIEW_TABS.POSTS &&
        (posts.length === 0 ? (
          <div className={styles.previewEmptyContainer}>
            <EmptyPlaceholder content="아직 작성한 글이 없어요" />
          </div>
        ) : (
          <div className={styles.previewContentSection}>
            {posts.map((post) => (
              <PostPreview
                key={post.postId}
                title={post.title ?? ''}
                content={post.content ?? ''}
                commentCount={post.commentCount}
                createdAt={post.createdAt ?? ''}
                onClick={() => handleNavigateDetail(post.postId)}
              />
            ))}
            <div className={styles.virtualRef} ref={postsObserverRef} />
          </div>
        ))}
      {activeTab === PREVIEW_TABS.COMMENTS &&
        (comments.length === 0 ? (
          <div className={styles.previewEmptyContainer}>
            <EmptyPlaceholder content="아직 작성한 댓글이 없어요" />
          </div>
        ) : (
          <div className={styles.previewContentSection}>
            {comments.map((comment) => (
              <CommentPreview
                key={comment.commentId}
                createdAt={comment.createdAt}
                content={comment.content}
                onClick={() => handleNavigateDetail(comment.postId)}
              />
            ))}
            <div className={styles.virtualRef} ref={commentsObserverRef} />
          </div>
        ))}
    </section>
  );
};

export default Preview;
