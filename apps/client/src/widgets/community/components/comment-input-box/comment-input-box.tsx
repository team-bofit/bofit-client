import { ChangeEvent, KeyboardEvent, useRef } from 'react';

import { Input, useModal } from '@bds/ui';
import { Icon } from '@bds/ui/icons';

import { PLACEHOLDER } from '@widgets/community/constant/input-placeholder';
import { useChangeInputMode } from '@widgets/community/context/input-mode-context';

import CommunityModal from '../community-modal/community-modal';

import * as styles from './comment-input-box.css';

interface CommentInputBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorState?: boolean;
  onSubmit: (file?: File) => void;
  focusKey?: string;
  selectedFile: File | null;
  previewUrl?: string;
  onImageChange: (file: File | null) => void;
  onClearImage?: () => void;
}

const CommentInputBox = ({
  value,
  onChange,
  errorState,
  onSubmit,
  focusKey,
  selectedFile,
  previewUrl,
  onImageChange,
  onClearImage,
}: CommentInputBoxProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mode, dispatch } = useChangeInputMode();
  const { openModal, closeModal } = useModal();

  const modalType: 'create' | 'edit' =
    (mode.type === 'comment' || mode.type === 'reply') && mode.action === 'edit'
      ? 'edit'
      : 'create';

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
    onImageChange(e.target.files?.[0] ?? null);
  };

  const handleOpenFileDialog = () => {
    (document.activeElement as HTMLElement)?.blur();
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const handleRemoveAllClick = () => {
    openModal(
      <CommunityModal
        type={modalType}
        onClose={closeModal}
        onCancelInput={() => {
          onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
          onClearImage?.();
          dispatch({ type: 'RESET' });
          closeModal();
        }}
      />,
    );
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    onClearImage?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed && !selectedFile) {
      return;
    }

    onSubmit(selectedFile || undefined);
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    handleRemoveImage();

    if (modalType === 'edit') {
      dispatch({ type: 'RESET' });
    }
  };

  const shouldShowClear = !!value.trim() || selectedFile || !!previewUrl;
  const displayImage = selectedFile
    ? URL.createObjectURL(selectedFile)
    : previewUrl;

  return (
    <section className={styles.commentWrapper}>
      {displayImage && (
        <div className={styles.imagePreviewWrapper}>
          <img
            src={displayImage}
            alt="preview"
            className={styles.previewImage}
            onLoad={() => selectedFile && URL.revokeObjectURL(displayImage)}
          />
          <Icon
            name="close_sm"
            width="2.4rem"
            height="2.4rem"
            style={{ cursor: 'pointer' }}
            onClick={handleRemoveImage}
          />
        </div>
      )}

      <div className={styles.inputWrapper}>
        <Input
          key={focusKey}
          autoFocus
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

        <span
          className={styles.imageWrapper}
          onClick={handleOpenFileDialog}
          role="button"
        >
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
              onClick={handleRemoveAllClick}
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
    </section>
  );
};

export default CommentInputBox;
