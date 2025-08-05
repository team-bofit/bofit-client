import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Navigation, useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import CommentInputBox from '@widgets/community/components/comment-input-box/comment-input-box';
import CommunityModal from '@widgets/community/components/community-modal/community-modal';
import FeedDetailInfo from '@widgets/community/components/feed-detail-info/feed-detail-info';
import UserCommentList from '@widgets/community/components/user-comment-list/user-comment-list';
import { ModalType } from '@widgets/community/types/community-modal.type';

import {
  COMMUNITY_MUTATION_OPTIONS,
  COMMUNITY_QUERY_OPTIONS,
} from '@shared/api/domain/community/queries';
import { USER_QUERY_OPTIONS } from '@shared/api/domain/onboarding/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { LIMIT_MEDIUM_TEXT } from '@shared/constants/text-limits';
import { useLimitedInput } from '@shared/hooks/use-limited-input';
import { routePath } from '@shared/router/path';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './community-detail.css';

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { openModal, closeModal } = useModal();
  const { postId } = useParams<{ postId: string }>();
  const { isErrorState } = useLimitedInput(LIMIT_MEDIUM_TEXT, content.length);
  const queryClient = useQueryClient();

  if (!postId) {
    throw new Error('postId가 존재하지 않습니다.');
  }

  const { data: feedDetailData } = useSuspenseQuery(
    COMMUNITY_QUERY_OPTIONS.FEED_DETAIL(postId),
  );

  const { data: profileData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());
  const { mutate: createCommentMutate } = useMutation({
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

  const userData = profileData?.data;
  const isPostOwner = feedDetailData?.writerId === userData?.userId;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const onSubmitComment = () => {
    if (!content.trim()) {
      return;
    }
    createCommentMutate(
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

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutate(commentId);
    closeModal();
  };

  const showDeleteModal = (type: ModalType, commentId?: string) => {
    openModal(
      <CommunityModal
        type={type}
        commentId={commentId}
        onClose={closeModal}
        onConfirmDeleteFeed={handleDeleteFeed}
        onConfirmDeleteComment={handleDeleteComment}
      />,
    );
  };

  return (
    <>
      <Navigation
        title="커뮤니티"
        leftIcon={<Icon name="caret_left_lg" width="2.4rem" height="2.4rem" />}
        onClickLeft={handleGoBack}
        rightIcon={<Icon name="home" />}
        onClickRight={() => handleNavigate(routePath.HOME)}
      />

      <section className={styles.container}>
        <FeedDetailInfo
          nickname={feedDetailData?.writerNickname ?? ''}
          createdAt={getTimeAgo(feedDetailData?.createdAt ?? '')}
          profileImage={feedDetailData?.profileImage ?? ''}
          isOwner={isPostOwner}
          title={feedDetailData?.title ?? ''}
          content={feedDetailData?.content ?? ''}
          onEditClick={handleGoEdit}
          onDeleteClick={() => showDeleteModal('feed')}
        />

        <UserCommentList
          postId={postId}
          commentOwnerId={userData?.userId}
          feedDetailData={feedDetailData}
          onDeleteClick={(commentId) => showDeleteModal('comment', commentId)}
        />
      </section>

      <CommentInputBox
        value={content}
        onChange={handleChange}
        errorState={isErrorState}
        onSubmit={onSubmitComment}
      />
    </>
  );
};

export default CommunityDetail;
