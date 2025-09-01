import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useModal } from '@bds/ui';

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
import { routePath } from '@shared/router/path';
import { getTimeAgo } from '@shared/utils/get-time-ago';
import { queryClient } from '@shared/utils/query-client';

import * as styles from './feed-content.css';

interface FeedContentProps {
  postId: string;
}

const FeedContent = ({ postId }: FeedContentProps) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const { data: feedDetailData } = useSuspenseQuery(
    COMMUNITY_QUERY_OPTIONS.FEED_DETAIL(postId),
  );

  const { data: profileData } = useSuspenseQuery(USER_QUERY_OPTIONS.PROFILE());

  const userData = profileData?.data;
  const isPostOwner = feedDetailData?.writerId === userData?.userId;

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

  const handleDeleteFeed = () => {
    deleteFeedMutate();
    closeModal();
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutate(commentId);
    closeModal();
  };

  const handleGoEdit = () => {
    navigate(routePath.COMMUNITY_EDIT.replace(':postId', String(postId)), {
      state: {
        title: feedDetailData?.title,
        content: feedDetailData?.content,
      },
    });
  };

  return (
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
  );
};

export default FeedContent;
