import { useInfiniteQuery } from '@tanstack/react-query';

import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import { EMPTY_COMMENT } from '@widgets/community/constant/empty-content';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { FeedDetailResponse } from '@shared/api/types/types';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { getTimeAgo } from '@shared/utils/get-time-ago';

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

  if (!comments) {
    return null;
  }

  const allComments =
    comments.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  return (
    <article className={styles.commentMapContainer}>
      <div className={styles.commentInfo}>
        <Icon name="chat_square" width="2rem" height="2rem" color="gray800" />
        <p className={styles.commentNum}>댓글 {feedDetailData?.commentCount}</p>
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
              const commentImages = images?.length ? images : undefined;
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
                  images={commentImages}
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
