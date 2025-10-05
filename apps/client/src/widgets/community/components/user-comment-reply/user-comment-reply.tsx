import { Avatar, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';

import { Image } from '@shared/types/type';

import * as styles from './user-comment-reply.css';

interface UserCommentReplyProps {
  profileImage?: string;
  writerNickName?: string;
  createdAt: string;
  content?: string;
  images?: Image[];
  commentReplyId: number;
  onClickDelete?: (commentReplyId: number) => void;
  isReplyOwner?: boolean;
}

const UserCommentReply = ({
  profileImage,
  writerNickName,
  createdAt,
  content,
  images,
  commentReplyId,
  onClickDelete,
  isReplyOwner,
}: UserCommentReplyProps) => {
  const { mode, dispatch } = useChangeInputMode();

  const handleEditReply = () => {
    dispatch({
      type: 'REPLY_EDIT',
      commentId: commentReplyId,
      initialContent: content ?? '',
    });
  };

  const isEditingReply =
    mode.type === 'reply' &&
    mode.action === 'edit' &&
    mode.commentId === commentReplyId;

  return (
    <div className={styles.container({ isEditingReply })}>
      <div className={styles.userInfoContainer}>
        <div className={styles.leftContainer}>
          <Icon name="recomment_line" width="2rem" height="2rem" />
          <div className={styles.userInfo}>
            <Avatar size="sm" src={profileImage} />
            <div>
              <p className={styles.nickName}>{writerNickName}</p>
              <p className={styles.createdAt}>{createdAt}</p>
            </div>
          </div>
        </div>
        <div className={styles.iconButtonContainer}>
          {isReplyOwner && (
            <FilterDropDown
              rightIcon={<Icon name="more" />}
              isIconRotate={false}
            >
              <TextButton size="sm" color="black" onClick={handleEditReply}>
                수정
              </TextButton>
              <TextButton
                size="sm"
                color="error"
                onClick={() => onClickDelete && onClickDelete(commentReplyId)}
              >
                삭제
              </TextButton>
            </FilterDropDown>
          )}
        </div>
      </div>
      <div className={styles.commentContainer}>
        <p className={styles.comment}>{content}</p>
      </div>
      {images && images.length > 0 && (
        <div className={styles.imageContainer}>
          {images.map(({ imageId, imageUrl }, index) => (
            <img
              className={styles.replyImage}
              key={imageId ?? `${commentReplyId}-${index}`}
              src={imageUrl}
              alt={`${writerNickName}님의 ${index + 1}번째 댓글 이미지 `}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommentReply;
