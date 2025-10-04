import { useRef, useState } from 'react';

import { Avatar, Button, Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import AccountMenuBar from '@widgets/mypage/components/account-menu-bar/account-menu-bar';
import Preview from '@widgets/mypage/components/preview/preview';

import { useToggle } from '@shared/hooks/use-toggle';

import * as styles from './body.css';

interface ContentProps {
  nickname: string;
  profileImage?: string;
}

const Body = ({ nickname, profileImage }: ContentProps) => {
  const [isEditing, toggleEditing] = useToggle(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newProfileImage, setNewProfileImage] = useState(profileImage);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfileEdit = () => {
    toggleEditing();
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfileImage(imageUrl);
    }
  };

  return (
    <section className={styles.userSection}>
      <div className={styles.userContent}>
        <div className={styles.userProfileSection}>
          <Avatar size="lg" src={newProfileImage} />
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
