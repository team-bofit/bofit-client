import { Fragment } from 'react/jsx-runtime';

import { Avatar, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';
import { CommentType } from '@widgets/community/types/community-comment.type.ts';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment-info.css';

interface UserCommentInfoProps {
  comment: CommentType;
  images?: Image[];
  commentId: number;
  isEditingComment: boolean;
}

const UserCommentInfo = ({
  comment,
  images,
  commentId,
  isEditingComment,
}: UserCommentInfoProps) => {
  const {
    content,
    writerNickName,
    createdAt,
    profileImage,
    isCommentOwner,
    onDeleteClick,
  } = comment;
  const { mode, dispatch } = useChangeInputMode();

  const commentImages =
    images?.filter(({ imageUrl }) => imageUrl?.trim()) ?? [];

  const handleCommentEdit = () => {
    dispatch({
      type: 'COMMENT_EDIT',
      commentId,
      initialContent: content ?? '',
      images: (images ?? [])
        .filter((img) => !!img.imageUrl)
        .map((img) => ({ imageId: img.imageId, imageUrl: img.imageUrl })),
    });
  };

  const deletedSet = new Set(
    mode.type === 'comment' && mode.action === 'edit'
      ? (mode.deleteImageIds ?? [])
      : [],
  );
  const visibleImages = isEditingComment
    ? commentImages.filter((i) =>
        i.imageId == null ? true : !deletedSet.has(i.imageId),
      )
    : commentImages;

  const handleDeleteImage = (id?: number) => () => {
    if (id == null) {
      return;
    }
    dispatch({ type: 'COMMENT_EDIT_DELETE_IMAGE', imageId: id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            <Avatar size="md" src={profileImage} />
            <div>
              <h2 className={styles.nickName}>{writerNickName}</h2>
              <p className={styles.timestamp}>{createdAt}</p>
            </div>
          </div>
          <div className={styles.iconButtonContainer}>
            {isCommentOwner && (
              <FilterDropDown
                rightIcon={<Icon name="more" />}
                isIconRotate={false}
                iconBackground="whiteBackground"
              >
                <TextButton size="sm" color="black" onClick={handleCommentEdit}>
                  수정
                </TextButton>
                <TextButton size="sm" color="error" onClick={onDeleteClick}>
                  삭제
                </TextButton>
              </FilterDropDown>
            )}
          </div>
        </div>
        <p className={styles.comment}>{content}</p>
      </div>
      {visibleImages.map(({ imageId, imageUrl }) => (
        <Fragment key={imageId}>
          <div className={styles.imageContainer}>
            <img
              className={styles.postImage}
              src={imageUrl}
              alt={`${writerNickName}님의 댓글 ${imageId}번째 이미지 `}
            />
          </div>
          {isEditingComment && (
            <p className={styles.deleteText}>
              <TextButton
                size="sm"
                color="black"
                onClick={handleDeleteImage(imageId)}
              >
                삭제
              </TextButton>
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default UserCommentInfo;
