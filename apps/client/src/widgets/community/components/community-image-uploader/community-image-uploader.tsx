import { Icon } from '@bds/ui/icons';

import * as styles from './community-image-uploader.css';

interface CommunityImageUploaderProps {
  onChange: (files: FileList) => void;
}

const CommunityImageUploader = ({ onChange }: CommunityImageUploaderProps) => {
  return (
    <label className={styles.ImageUploaderContainer}>
      <Icon name="img_add" width="2.4rem" height="2.4rem" color="gray800" />
      <p className={styles.ImageUploadText}>사진 올리기</p>
      <input
        type="file"
        accept="image/*"
        multiple
        className={styles.ImageHiddenInput}
        onChange={(e) => e.target.files && onChange(e.target.files)}
      />
    </label>
  );
};

export default CommunityImageUploader;
