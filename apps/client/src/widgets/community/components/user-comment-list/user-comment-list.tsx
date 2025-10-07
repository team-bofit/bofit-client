import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_COMMENT } from '@widgets/community/constant/empty-content';

import {
  COMMUNITY_MUTATION_OPTIONS,
  COMMUNITY_QUERY_OPTIONS,
} from '@shared/api/domain/community/queries';
import { COMMUNITY_QUERY_KEY } from '@shared/api/keys/query-key';
import { FeedDetailResponse } from '@shared/api/types/types';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { getTimeAgo } from '@shared/utils/utils';
import { queryClient } from '@shared/utils/query-client';

import * as styles from './user-comment-list.css';

interface UserCommentListProps {
  postId: string;
  commentOwnerId?: number;
  feedDetailData?: FeedDetailResponse | null;
  onCommentDeleteClick: (commentId: number) => void;
  onCommentReplyDeleteClick?: (commentId: number, replyId: number) => void;
}

const UserCommentList = ({
  postId,
  commentOwnerId,
  feedDetailData,
  onCommentDeleteClick,
  onCommentReplyDeleteClick,
}: UserCommentListProps) => {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENTS(postId),
  });

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const isLiked = feedDetailData?.likedByCurrentUser;

  const { mutate: addLike } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.ADD_LIKE(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });
    },
  });

  const { mutate: deleteLike } = useMutation({
    ...COMMUNITY_MUTATION_OPTIONS.DELETE_LIKE(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: COMMUNITY_QUERY_KEY.FEED_DETAIL(postId),
      });
    },
  });

  if (!comments) {
    return null;
  }

  const allComments =
    comments.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  return (
    <article className={styles.commentMapContainer}>
      <div className={styles.feedInfo}>
        <div className={styles.feedInfoItem}>
          <div className={styles.likeIcon}>
            {isLiked ? (
              <Icon
                name="heart_fill"
                width="2.4rem"
                height="2.4rem"
                color="error"
                onClick={() => deleteLike()}
              />
            ) : (
              <Icon
                name="heart"
                width="2.4rem"
                height="2.4rem"
                color="gray800"
                onClick={() => addLike()}
              />
            )}
          </div>
          <p className={styles.feedInfoNum}>{feedDetailData?.likeCount}</p>
        </div>
        <div className={styles.feedInfoItem}>
          <Icon name="chat_square" width="2rem" height="2rem" color="gray800" />
          <p className={styles.feedInfoNum}>{feedDetailData?.commentCount}</p>
        </div>
      </div>

      <div className={styles.commentContainer}>
        {allComments.length > 0 ? (
          allComments.map(
            ({
              writerId,
              commentId,
              content,
              writerNickname,
              createdAt,
              profileImage,
              replyCount,
              images,
            }) => {
              if (commentId == null) {
                return null;
              }

              return (
                <UserComment
                  key={commentId}
                  comment={{
                    content: content,
                    writerNickName: writerNickname,
                    createdAt: getTimeAgo(createdAt),
                    profileImage: profileImage,
                    isCommentOwner: writerId === commentOwnerId,
                    onDeleteClick: () => onCommentDeleteClick(commentId),
                  }}
                  replyCount={replyCount ?? 0}
                  images={images?.length ? images : undefined}
                  postId={postId}
                  commentId={commentId}
                  commentOwnerId={commentOwnerId}
                  onCommentReplyDeleteClick={onCommentReplyDeleteClick}
                />
              );
            },
          )
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.emptyPlaceholder}>
              <EmptyPlaceholder content={EMPTY_COMMENT} />
            </div>
          </div>
        )}
        <div ref={commentsObserverRef} className={styles.virtualRef} />
      </div>
    </article>
  );
};

export default UserCommentList;
