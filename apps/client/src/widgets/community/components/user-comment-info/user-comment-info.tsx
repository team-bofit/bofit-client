import { Avatar, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';
import { CommentType } from '@widgets/community/types/community-comment.type.ts';

import { Image } from '@shared/types/type.ts';

import * as styles from './user-comment-info.css';

interface UserCommentInfoProps {
  comment: CommentType;
  images?: Image[];
}

const UserCommentInfo = ({ comment, images }: UserCommentInfoProps) => {
  const {
    content,
    writerNickName,
    createdAt,
    profileImage,
    isCommentOwner,
    onClickDelete,
  } = comment;

  const commentImages =
    images?.filter(({ imageUrl }) => imageUrl?.trim()) ?? [];

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
              >
                <TextButton
                  size="sm"
                  color="black"
                  onClick={() => {
                    // @TODO: 댓글 수정 API 연동
                  }}
                >
                  수정
                </TextButton>
                <TextButton size="sm" color="error" onClick={onClickDelete}>
                  삭제
                </TextButton>
              </FilterDropDown>
            )}
          </div>
        </div>
        <p className={styles.comment}>{content}</p>
      </div>
      {commentImages.map(({ imageId, imageUrl }) => (
        <div key={imageId} className={styles.imageContainer}>
          <img
            className={styles.postImage}
            src={imageUrl}
            alt={`${writerNickName}님의 댓글 ${imageId}번째 이미지 `}
          />
        </div>
      ))}
    </div>
  );
};

export default UserCommentInfo;
