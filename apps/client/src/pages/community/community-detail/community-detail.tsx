import { useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
} from '@shared/api/domain/community/queries';
import { POST_FEED_DETAIL_OPTIONS } from '@shared/api/domain/community/queries';
import { USER_QUERY_OPTIONS } from '@shared/api/domain/onboarding/queries';
import { getTimeAgo } from '@shared/api/utils/get-time-ago';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';

import * as styles from './community-detail.css';
import { virtualRef } from '@widgets/mypage/preview.css';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(30, content.length);
  const { openModal, closeModal } = useModal();

  if (!postId) {
    throw new Error('postId가 없습니다.');
  }

  const { data } = useQuery(POST_FEED_DETAIL_OPTIONS.DETAIL(postId));

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

  const handleOpenModal = () => {
    openModal(
      <Modal>
        <Modal.Title>이 댓글을 삭제할까요?</Modal.Title>
        <Modal.Content text="삭제한 댓글은 복원되지 않습니다." />
        <Modal.Actions>
          <Button onClick={handleClickDelete} variant="gray_fill">
            취소
          </Button>
          <Button variant="error" onClick={closeModal}>
            삭제
          </Button>
        </Modal.Actions>
      </Modal>,
    );
  };

  const handleClickDelete = () => {
    closeModal();
    // TODO: 실제 삭제 API 연동 or 상태 업데이트
  };

  if (!comments) {
    return null;
  }

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
          onClick={handleGoEdit}
        />

        <article className={styles.commentMapContainer}>
          <div className={styles.commentInfo}>
            <Icon name="chat_square" width="2rem" height="2rem" />
            <p className={styles.commentNum}>댓글 {data?.commentCount}</p>
          </div>

          <div className={styles.commentContainer}>
            {allComments.length > 0 ? (
              allComments.map((comment) => {
                const isCommentOwner = comment.writerId === comment.commentId;
                return (
                  <UserComment
                    key={`${comment.commentId}`}
                    content={comment.content}
                    writerNickName={comment.writerNickname}
                    createdAt={getTimeAgo(comment.createdAt)}
                    profileImage={comment.profileImage}
                    isCommentOwner={isCommentOwner}
                    onClickDelete={handleOpenModal}
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
