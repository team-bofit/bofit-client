import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import { Input } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';

import * as styles from './comment-input-box.css';

interface CommentInputBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorState?: boolean;
  onSubmit: (file?: File) => void;
}

const CommentInputBox = ({
  value,
  onChange,
  errorState,
  onSubmit,
}: CommentInputBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!value.trim() && !selectedFile) {
      return;
    }
    onSubmit(selectedFile || undefined);
    setSelectedFile(null);
  };

  const shouldShowClear = value.trim().length > 0 || selectedFile !== null;

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.inputWrapper}>
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          bgColor="white"
          placeholder={PLACEHOLDER.COMMENT}
          errorState={errorState}
          inputSize="sm"
        />
      </div>

      <div className={styles.controlWrapper}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileChange}
        />

        <span className={styles.imageWrapper} onClick={handleOpenFileDialog}>
          <Icon
            name="img_add"
            width="2.4rem"
            height="2.4rem"
            color="gray800"
            style={{ cursor: 'pointer' }}
          />
          <p>사진 올리기</p>
        </span>

        <span className={styles.buttonWrapper}>
          {shouldShowClear && (
            <Icon
              name="x_btn_comment"
              width="4rem"
              height="4rem"
              onClick={handleSubmit}
              style={{ cursor: 'pointer' }}
            />
          )}
          <Icon
            name="btn_comment"
            width="4rem"
            height="4rem"
            onClick={handleSubmit}
            style={{ cursor: 'pointer' }}
          />
        </span>
      </div>
    </div>
  );
};

export default CommentInputBox;
