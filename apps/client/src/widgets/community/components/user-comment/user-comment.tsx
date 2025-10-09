import { useInfiniteQuery } from '@tanstack/react-query';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';
import UserCommentReply from '@widgets/community/components/user-comment-reply/user-comment-reply';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { CommentType } from '@widgets/community/types/community-comment.type.ts';

import { COMMUNITY_QUERY_OPTIONS } from '@shared/api/domain/community/queries';
import { useIntersectionObserver } from '@shared/hooks/use-intersection-observer';
import { useToggle } from '@shared/hooks/use-toggle';
import { Image } from '@shared/types/type.ts';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: CommentType;
  replyCount: number;
  images?: Image[];
  postId: string;
  commentId: number;
  onCommentReplyDeleteClick?: (commentId: number, replyId: number) => void;
  commentOwnerId?: number;
}

const UserComment = ({
  comment,
  replyCount,
  images,
  postId,
  commentId,
  onCommentReplyDeleteClick,
  commentOwnerId,
}: UserCommentProps) => {
  const { mode, dispatch } = useChangeInputMode();
  const [isRepliesOpen, toggleReplies] = useToggle();

  const {
    data: commentReply,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENT_REPLY(postId, commentId),
    enabled: Boolean(isRepliesOpen && commentId != null),
    retry: false,
  });

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  const allCommentReply =
    commentReply?.pages.flatMap((page) => page?.data?.content ?? []) ?? [];

  const handleSubmitReply = () => {
    dispatch({ type: 'REPLY_CREATE', parentCommentId: commentId });
  };

  const isEditingComment =
    mode.type === 'comment' &&
    mode.action === 'edit' &&
    mode.commentId === commentId;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.userInfoContainer({ isEditingComment })}>
          <UserCommentInfo
            comment={comment}
            images={images}
            commentId={commentId}
          />
          <p>
            <TextButton size="xs" color="black" onClick={handleSubmitReply}>
              {isEditingComment ? '수정 중...' : '답글 달기'}
            </TextButton>
          </p>
        </div>
        {replyCount > 0 && (
          <div className={styles.replyButtonContainer}>
            <button className={styles.replyContainer} onClick={toggleReplies}>
              <Icon
                name="caret_down_sm"
                width="2.4rem"
                height="2.4rem"
                color="gray800"
                className={styles.iconRotate({ rotated: isRepliesOpen })}
              />
              <p className={styles.reply}>
                답글 {replyCount}개 {isRepliesOpen ? '접기' : '보기'}
              </p>
            </button>
          </div>
        )}
      </div>
      {isRepliesOpen && (
        <>
          {allCommentReply.map(
            ({
              commentReplyId,
              profileImage,
              writerNickname,
              createdAt,
              content,
              images,
              writerId,
            }) => {
              if (commentReplyId == null) {
                return null;
              }

              return (
                <UserCommentReply
                  key={commentReplyId}
                  profileImage={profileImage}
                  writerNickName={writerNickname}
                  createdAt={getTimeAgo(createdAt)}
                  content={content}
                  images={images}
                  isReplyOwner={writerId === commentOwnerId}
                  onClickDelete={() => {
                    if (!onCommentReplyDeleteClick) {
                      return;
                    }
                    onCommentReplyDeleteClick(commentId, commentReplyId);
                  }}
                  commentReplyId={commentReplyId}
                />
              );
            },
          )}
          <div ref={commentsObserverRef} className={styles.virtualRef} />
        </>
      )}
    </div>
  );
};

export default UserComment;
