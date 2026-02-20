import { ChangeEvent, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Avatar, Button, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import AccountMenuBar from '@widgets/mypage/components/account-menu-bar/account-menu-bar';
import Preview from '@widgets/mypage/components/preview/preview';

import { USER_MUTATION_OPTIONS } from '@shared/api/domain/mypage/queries';
import { USER_MUTATION_KEY } from '@shared/api/keys/query-key';
import { useImageUpload } from '@shared/hooks/use-image-upload';
import { useInputState } from '@shared/hooks/use-input-state';
import { useToggle } from '@shared/hooks/use-toggle';
import { queryClient } from '@shared/utils/query-client';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
}

const Body = ({ nickname, profileImage }: ContentProps) => {
  const [isEditing, toggleEditing] = useToggle(false);
  const [nicknameValue, handleNicknameChange] = useInputState(nickname);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [newProfileImage, setNewProfileImage] = useState(profileImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: patchUserProfileMutate } = useMutation({
    ...USER_MUTATION_OPTIONS.PATCH_USER_PROFILE(),
  });

  const { uploadImageFiles } = useImageUpload();

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleProfileEdit = () => {
    toggleEditing();
    if (isEditing) {
      handlePatchUserProfile();
    }
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      const [uploadedImage] = await uploadImageFiles([file]);
      setNewProfileImage(uploadedImage);
    }
  };

  const handlePatchUserProfile = () => {
    patchUserProfileMutate(
      { body: { nickname: nicknameValue, profileImageUrl: newProfileImage } },
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
              onChange={handleNicknameChange}
              value={nicknameValue}
              bgColor="white"
            />
          ) : (
            nicknameValue
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
