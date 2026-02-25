import { Content, Title } from '@bds/ui';

import UserDetailMeta from '@widgets/community/components/user-detail-meta/user-detail-meta';

import { Image } from '@shared/types/type.ts';

import * as styles from './feed-detail-info.css';

interface FeedDetailInfoProps {
  title: string;
  content: string;
  nickname: string;
  imageUrl: Image[];
  isAuthor: boolean;
  createdAt: string;
  profileImage: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const FeedDetailInfo = ({
  title,
  content,
  nickname,
  imageUrl,
  isAuthor,
  createdAt,
  profileImage,
  onEditClick,
  onDeleteClick,
}: FeedDetailInfoProps) => {
  return (
    <div className={styles.topContainer}>
      <UserDetailMeta
        nickName={nickname}
        createdAt={createdAt}
        profileImage={profileImage}
        isAuthor={isAuthor}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      <div className={styles.postContentContainer}>
        <Title fontStyle="bd_md">{title}</Title>
        <Content text={content} length="lg" />
        {imageUrl.length > 0 && (
          <div className={styles.imageContainer}>
            {imageUrl.map((image) => (
              <img
                key={image.imageId}
                className={styles.postImage}
                src={image.imageUrl}
                alt="post image"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedDetailInfo;
