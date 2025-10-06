import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Avatar, Button, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import AccountMenuBar from '@widgets/mypage/components/account-menu-bar/account-menu-bar';
import Preview from '@widgets/mypage/components/preview/preview';

import { USER_MUTATION_OPTIONS } from '@shared/api/domain/mypage/queries';
import {
  MUTATION_QUERY_OPTIONS,
  uploadImageToS3,
} from '@shared/api/domain/queries';
import { USER_MUTATION_KEY } from '@shared/api/keys/query-key';
import { useToggle } from '@shared/hooks/use-toggle';
import { queryClient } from '@shared/utils/query-client';
import { extractS3Urls } from '@shared/utils/utils';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
}

const Body = ({ nickname, profileImage }: ContentProps) => {
  const [isEditing, toggleEditing] = useToggle(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [newProfileImage, setNewProfileImage] = useState(profileImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: patchUserProfileMutate } = useMutation({
    ...USER_MUTATION_OPTIONS.PATCH_USER_PROFILE(),
  });

  const { mutate: postImageUploadMutate } = useMutation({
    ...MUTATION_QUERY_OPTIONS.POST_IMAGE(),
  });

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleProfileEdit = () => {
    toggleEditing();
    if (isEditing) {
      handlePatchUserProfile();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      postImageUploadMutate([file.type], {
        onSuccess: (data) => {
          uploadImageToS3(data.presignedUrls[0], file);
          setNewProfileImage(extractS3Urls([data.presignedUrls[0]])[0]);
        },
      });
    }
  };

  const handlePatchUserProfile = () => {
    patchUserProfileMutate(
      { body: { nickname: newNickname, profileImageUrl: newProfileImage } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: USER_MUTATION_KEY.USER_PROFILE(),
          });
        },
      },
    );
  };

  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <div className={styles.userProfileSection}>
          <Avatar size="lg" src={previewImage ?? newProfileImage} />
          {isEditing && (
            <>
              <div
                className={styles.addImageContainer}
                onClick={handleClickImageButton}
              >
                <Icon
                  name="img_add"
                  width="2rem"
                  height="2rem"
                  color="gray900"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChangeImage}
                className={styles.hiddenInput}
              />
            </>
          )}
        </div>
        <div className={styles.contentName}>
          {isEditing ? (
            <Input
              placeholder="이름을 입력해주세요"
              onChange={handleChangeNickname}
              value={newNickname}
              bgColor="white"
            />
          ) : (
            newNickname
          )}
          <Button variant="white_fill" size="lg" onClick={handleProfileEdit}>
            {isEditing ? '프로필 편집 완료하기' : '프로필 편집'}
          </Button>
        </div>
      </div>
      <Preview />
      <AccountMenuBar />
    </section>
  );
};

export default Body;
