import { useRef } from 'react';

import { Icon } from '@bds/ui/icons';

import * as styles from './community-image-uploader.css';

const CommunityImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.ImageUploaderContainer} onClick={handleClick}>
      <Icon name="img_add" width="2.4rem" height="2.4rem" color="gray800" />
      <p className={styles.ImageUploadText}>사진 올리기</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.ImageHiddenInput}
      />
    </div>
  );
};

export default CommunityImageUploader;
