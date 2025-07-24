import { useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
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
  COMMUNITY_MUTATION_OPTIONS,
  COMMUNITY_QUERY_OPTIONS,
} from '@shared/api/domain/community/queries';
import { USER_QUERY_OPTIONS } from '@shared/api/domain/onboarding/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { LIMIT_MEDIUM_TEXT } from '@shared/constants/text-limits';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './community-detail.css';
import { virtualRef } from '@widgets/mypage/preview.css';

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

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);
  const queryClient = useQueryClient();

  if (!postId) {
    throw new Error('postId가 존재하지 않습니다.');
  }

  const { data: feedDetailData } = useSuspenseQuery(
    COMMUNITY_QUERY_OPTIONS.FEED_DETAIL(postId),
  );
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENTS(postId),
  });

  const { data: profileData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  const { mutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.POST_COMMENT(),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(variables.postId),
      });
    },
  });

  const { mutate: deleteFeedMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.DELETE_FEED(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_PREVIEW(),
      });
      navigate(routePath.COMMUNITY);
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.DELETE_COMMENT(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.COMMENTS(postId),
      });
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });
    },
  });

  const handleDeleteFeed = () => {
    deleteFeedMutate();
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setContent(e.target.value);
    }
  };

  const allComments =
    comments?.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const userData = profileData?.data;
  const isPostOwner = feedDetailData?.writerId === userData?.userId;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
        title: feedDetailData?.title,
        content: feedDetailData?.content,
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
        <Modal.ContentContainer>
          <Modal.Content
            text={
              isFeed ? DELETE_MODAL.FEED.content : DELETE_MODAL.COMMENT.content
            }
          />
        </Modal.ContentContainer>
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
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={handleGoBack}
        rightIcon={<Icon name="home" />}
        onClickRight={() => handleNavigate(routePath.HOME)}
      />

      <article className={styles.container}>
        <PostDetailInfo
          nickname={feedDetailData?.writerNickname ?? ''}
          createdAt={getTimeAgo(feedDetailData?.createdAt ?? '')}
          profileImage={feedDetailData?.profileImage ?? ''}
          isOwner={isPostOwner}
          title={feedDetailData?.title ?? ''}
          content={feedDetailData?.content ?? ''}
          onEditClick={handleGoEdit}
          onDeleteClick={() => showDeleteModal('feed')}
        />

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon
              name="chat_square"
              width="2rem"
              height="2rem"
              color="gray800"
            />
            <p className={styles.commentNum}>
              댓글 {feedDetailData?.commentCount}
            </p>
          </div>

          <div className={styles.commentContainer}>
            {allComments.length > 0 ? (
              allComments.map((comment) => {
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
              <div className={styles.placeholder}>
                <div className={styles.emptyPlaceholder}>
                  <EmptyPlaceholder content={EMPTY_COMMENT} />
                </div>
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
