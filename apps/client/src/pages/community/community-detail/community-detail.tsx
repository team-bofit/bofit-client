import { useState } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Navigation, useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentBox from '@widgets/community/components/comment-box/comment-box';
import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import PostDetailInfo from '@widgets/community/components/post-detail-info/post-detail-info';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_COMMENT } from '@widgets/community/constant/empty-content';

import {
  COMMUNITY_QUERY_OPTIONS,
  POST_COMMENT,
  useDeleteComment,
  useDeleteFeed,
} from '@shared/api/domain/community/queries';
import { POST_FEED_DETAIL_OPTIONS } from '@shared/api/domain/community/queries';
import { USER_QUERY_OPTIONS } from '@shared/api/domain/onboarding/queries';
import { getTimeAgo } from '@shared/api/utils/get-time-ago';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

import * as styles from './community-detail.css';

const DELETE_MODAL = {
  FEED: {
    title: '이 글을 삭제할까요?',
    content: '삭제한 글/댓글은 복원되지 않습니다.',
  },
  COMMENT: {
    title: '이 댓글을 삭제할까요?',
    content: '삭제한 댓글은 복원되지 않습니다.',
  },
};
import { virtualRef } from '@widgets/mypage/preview.css';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(30, content.length);

  if (!postId) {
    throw new Error('postId가 없습니다.');
  }

  const { data } = useSuspenseQuery(POST_FEED_DETAIL_OPTIONS.DETAIL(postId));

  const { data: queryData } = useQuery(USER_QUERY_OPTIONS.PROFILE());
  const userData = queryData?.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setContent(e.target.value);
    }
  };

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENTS(postId),
    getNextPageParam: (lastPage) =>
      lastPage?.data?.nextCursor ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });

  const allComments =
    comments?.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const isPostOwner = data?.writerId === userData?.userId;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const { mutate } = POST_COMMENT();

  const onSubmitComment = () => {
    if (!content.trim()) {
      return;
    }

    mutate(
      { postId, content: content.trim() },
      {
        onSuccess: () => {
          setContent('');
        },
      },
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoEdit = () => {
    navigate(routePath.COMMUNITY_EDIT.replace(':postId', String(postId)), {
      state: {
        title: data?.title,
        content: data?.content,
      },
    });
  };

  const { openModal, closeModal } = useModal();
  type ModalType = 'feed' | 'comment' | null;

  const showDeleteModal = (type: ModalType, commentId?: string) => {
    openModal(renderModal(type, commentId));
  };

  const renderModal = (type: ModalType, commentId?: string) => {
    const isFeed = type === 'feed';
    return (
      <Modal>
        <Modal.Title>
          {isFeed ? DELETE_MODAL.FEED.title : DELETE_MODAL.COMMENT.title}
        </Modal.Title>
        <Modal.Content
          text={
            isFeed ? DELETE_MODAL.FEED.content : DELETE_MODAL.COMMENT.content
          }
        />

        <Modal.Actions>
          <Button onClick={closeModal} variant="gray_fill">
            취소
          </Button>
          <Button
            variant="error"
            onClick={() => {
              if (isFeed) {
                handleDeleteFeed();
              } else if (commentId) {
                handleDeleteComment(commentId);
              }
            }}
          >
            삭제
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  const { mutate: deleteFeedMutate } = useDeleteFeed(() => {
    navigate(routePath.COMMUNITY);
  });

  const handleDeleteFeed = () => {
    deleteFeedMutate(postId);
    closeModal();
  };

  const { mutate: deleteCommentMutate } = useDeleteComment(postId);

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutate(commentId);
    closeModal();
  };

  if (!comments) {
    return null;
  }

  return (
    <>
      <Navigation
        title="커뮤니티"
        leftIcon={
          <Icon
            name="caret_left_lg"
            width="2.4rem"
            height="2.4rem"
            onClick={handleGoBack}
          />
        }
        rightIcon={
          <Icon name="home" onClick={() => handleNavigate(routePath.HOME)} />
        }
      />

      <article className={styles.container}>
        <PostDetailInfo
          nickname={data?.writerNickname ?? ''}
          createdAt={getTimeAgo(data?.createdAt ?? '')}
          profileImage={data?.profileImage ?? ''}
          isOwner={isPostOwner}
          title={data?.title ?? ''}
          content={data?.content ?? ''}
          onEditClick={handleGoEdit}
          onDeleteClick={() => showDeleteModal('feed')}
        />

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {data?.commentCount}</p>
          </div>

          <div className={styles.commentContainer}>
            {allComments.length > 0 ? (
              allComments.map((comment, idx) => {
                const isCommentOwner = comment.writerId === userData?.userId;

                return (
                  <UserComment
                    key={`${comment.commentId}`}
                    content={comment.content}
                    writerNickName={comment.writerNickname}
                    createdAt={getTimeAgo(comment.createdAt)}
                    profileImage={comment.profileImage}
                    isCommentOwner={isCommentOwner}
                    onClickDelete={() =>
                      showDeleteModal('comment', String(comment.commentId))
                    }
                  />
                );
              })
            ) : (
              <div className={styles.emptyPlaceholder}>
                <EmptyPlaceholder content={EMPTY_COMMENT} />
              </div>
            )}
            <div ref={commentsObserverRef} className={virtualRef} />
          </div>
        </article>
      </article>
      <CommentBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={onSubmitComment}
      />
    </>
  );
};

export default CommunityDetail;
