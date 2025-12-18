import { Avatar, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { ReplyImage } from '@widgets/community/types/reply-image.type';

import { Image } from '@shared/types/type';

import * as styles from './user-comment-reply.css';

interface UserCommentReplyProps {
  profileImage?: string;
  writerNickName?: string;
  createdAt: string;
  content?: string;
  images?: Image[];
  parentCommentId: number;
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
  parentCommentId,
  commentReplyId,
  onClickDelete,
  isReplyOwner,
}: UserCommentReplyProps) => {
  const { mode, dispatch } = useChangeInputMode();

  const handleEditReply = () => {
    const replyImages = (images ?? [])
      .filter((img): img is ReplyImage => !!img.imageUrl)
      .map((img) => {
        const id = img.imageId ?? img.commentReplyImageId;
        return { imageId: id, imageUrl: img.imageUrl };
      });

    dispatch({
      type: 'REPLY_EDIT',
      commentId: parentCommentId,
      commentReplyId,
      initialContent: content ?? '',
      images: replyImages,
    });
  };

  const getId = (
    img: { imageId?: number; commentReplyImageId?: number } | undefined,
  ) => img?.imageId ?? img?.commentReplyImageId;

  const isEditingReply =
    mode.type === 'reply' &&
    mode.action === 'edit' &&
    mode.commentReplyId === commentReplyId;

  const deletedSet = new Set(isEditingReply ? (mode.deleteImageIds ?? []) : []);

  const visibleImages = ((images ?? []) as ReplyImage[]).filter((img) => {
    const id = getId(img);
    return id == null ? true : !deletedSet.has(id);
  });

  const firstVisibleId = getId(visibleImages[0]);

  const handleDeleteImage = (id?: number) => () => {
    if (id == null) {
      return;
    }
    dispatch({ type: 'REPLY_EDIT_DELETE_IMAGE', imageId: id });
  };

  return (
    <div className={styles.container({ isEditingReply })}>
      <div className={styles.userInfoContainer}>
        <div className={styles.leftContainer}>
          <Icon name="recomment_line" width="1.2rem" height="1.8rem" />
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
          {visibleImages.map((img, index) => (
            <img
              className={styles.replyImage}
              key={getId(img) ?? `${commentReplyId}-${index}`}
              src={img.imageUrl}
              alt={`${writerNickName}님의 ${index + 1}번째 댓글 이미지 `}
            />
          ))}
          {isEditingReply && (
            <p className={styles.deleteText}>
              <TextButton
                size="sm"
                color="black"
                onClick={handleDeleteImage(firstVisibleId)}
              >
                삭제
              </TextButton>
            </p>
          )}
        </div>
      )}
      {isEditingReply && <p className={styles.editingReply}>수정 중...</p>}
    </div>
  );
};

export default UserCommentReply;
