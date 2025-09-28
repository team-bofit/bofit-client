import { TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import UserCommentInfo from '@widgets/community/components/user-comment-info/user-comment-info';
import UserCommentReply from '@widgets/community/components/user-comment-reply/user-comment-reply';
import { mockUserCommentReplies } from '@widgets/community/constant/mock-user-comment-reply';
import { CommentType } from '@widgets/community/types/community-comment.type.ts';

import { useToggle } from '@shared/hooks/use-toggle';
import { Image } from '@shared/types/type.ts';
import { getTimeAgo } from '@shared/utils/get-time-ago';

import * as styles from './user-comment.css';

interface UserCommentProps {
  comment: CommentType;
  replyCount: number;
  images?: Image[];
}

const UserComment = ({ comment, replyCount, images }: UserCommentProps) => {
  const [isRepliesOpen, toggleReplies] = useToggle();

  // @TODO: 대댓글 API 연동

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
          {mockUserCommentReplies.map(
            ({
              id,
              profileImage,
              writerNickName,
              createdAt,
              content,
              images,
            }) => (
              <UserCommentReply
                key={id}
                profileImage={profileImage}
                writerNickName={writerNickName}
                createdAt={getTimeAgo(createdAt)}
                content={content}
                images={images}
              />
            ),
          )}
        </>
      )}
    </>
  );
};

export default UserComment;
