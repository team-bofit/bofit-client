import { Avatar, TextButton } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import FilterDropDown from '@widgets/community/components/filter-dropdown/filter-dropdown';

import { Image } from '@shared/types/type';

import * as styles from './user-comment-reply.css';

interface UserCommentReplyProps {
  profileImage?: string;
  writerNickName?: string;
  createdAt: string;
  content?: string;
  images?: Image[];
}

const UserCommentReply = ({
  profileImage,
  writerNickName,
  createdAt,
  content,
  images,
}: UserCommentReplyProps) => {
  return (
    <div className={styles.container}>
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
          <FilterDropDown rightIcon={<Icon name="more" />} isIconRotate={false}>
            <TextButton
              size="sm"
              color="black"
              onClick={() => {
                // @TODO: 댓글 수정 API 연동
              }}
            >
              수정
            </TextButton>
            <TextButton
              size="sm"
              color="error"
              onClick={() => {
                // @TODO: 댓글 삭제 API 연동
              }}
            >
              삭제
            </TextButton>
          </FilterDropDown>
        </div>
      </div>
      <div className={styles.commentContainer}>
        <p className={styles.comment}>{content}</p>
      </div>
      {images && images.length > 0 && (
        <div className={styles.imageContainer}>
          {images.map(({ imageId, imageUrl }) => (
            <img
              className={styles.replyImage}
              key={imageId}
              src={imageUrl}
              alt={`${writerNickName}님의 ${imageId}번째 댓글 이미지`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommentReply;
