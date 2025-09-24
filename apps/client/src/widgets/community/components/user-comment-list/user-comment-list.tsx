import { useInfiniteQuery } from '@tanstack/react-query';

import { Icon } from '@bds/ui/icons';

import EmptyPlaceholder from '@widgets/community/components/empty-placeholder/empty-placeholder';
import UserComment from '@widgets/community/components/user-comment/user-comment';
import UserCommentReply from '@widgets/community/components/user-comment-reply/user-comment-reply';
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
  onDeleteClick: (commentId: string) => void;
}

const UserCommentList = ({
  postId,
  commentOwnerId,
  feedDetailData,
  onDeleteClick,
}: UserCommentListProps) => {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENTS(postId),
  });

  const allComments =
    comments?.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  if (!comments) {
    return null;
  }
  return (
    <div>
      <article className={styles.commentMapContainer}>
        <div className={styles.commentInfo}>
          <Icon name="chat_square" width="2rem" height="2rem" color="gray800" />
          <p className={styles.commentNum}>
            댓글 {feedDetailData?.commentCount}
          </p>
        </div>

        <div className={styles.commentContainer}>
          {allComments.length > 0 ? (
            allComments.map((comment) => {
              const isCommentOwner = comment.writerId === commentOwnerId;

              return (
                <>
                  <UserComment
                    key={`${comment.commentId}`}
                    content={comment.content}
                    writerNickName={comment.writerNickname}
                    createdAt={getTimeAgo(comment.createdAt)}
                    profileImage={comment.profileImage}
                    isCommentOwner={isCommentOwner}
                    onClickDelete={() =>
                      onDeleteClick(String(comment.commentId))
                    }
                  />
                  <UserCommentReply
                    profileImage={''}
                    writerNickName={'닉네임'}
                    createdAt={getTimeAgo('2025-09-24T09:22:13+09:00')}
                    content={'저도요 어쩌구...저쩌구'}
                    images={[
                      { imageId: 1, imageUrl: 'https://placehold.co/600x400' },
                    ]}
                  />
                </>
              );
            })
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
    </div>
  );
};

export default UserCommentList;
