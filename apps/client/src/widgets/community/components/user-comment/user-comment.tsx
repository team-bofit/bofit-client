import { useInfiniteQuery } from '@tanstack/react-query';

import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';
import UserCommentReply from '@widgets/community/components/user-comment-reply/user-comment-reply';
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
  onCommentReplyDeleteClick?: (commentId: number) => void;
}

const UserComment = ({
  comment,
  replyCount,
  images,
  postId,
  commentId,
  onCommentReplyDeleteClick,
}: UserCommentProps) => {
  const [isRepliesOpen, toggleReplies] = useToggle();

  const {
    data: commentReply,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...COMMUNITY_QUERY_OPTIONS.COMMENT_REPLY(postId, commentId),
  });

  const commentsObserverRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, true);

  if (!commentReply) {
    return null;
  }

  const allCommentReply =
    commentReply.pages.flatMap((page) => page?.data?.content ?? []) ?? [];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userInfoContainer}>
          <UserCommentInfo comment={comment} images={images} />
          <p>
            <TextButton size="xs" color="black">
              답글 달기
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
            }) => {
              if (typeof commentReplyId !== 'number') {
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
                  onClickDelete={onCommentReplyDeleteClick}
                  commentReplyId={commentReplyId}
                />
              );
            },
          )}
          <div ref={commentsObserverRef} className={styles.virtualRef} />
        </>
      )}
    </>
  );
};

export default UserComment;
