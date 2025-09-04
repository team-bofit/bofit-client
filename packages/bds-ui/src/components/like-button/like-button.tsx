import { Icon } from '@bds/ui/icons';

const LIKE_BUTTON_ARIA = {
  LIKE: '좋아요',
  UNLIKE: '비어있는 좋아요',
};

interface LikeButtonProps {
  width: number | string;
  height: number | string;
  onToggle?: () => void;
  isActive: boolean;
}

const LikeButton = ({ width, height, onToggle, isActive }: LikeButtonProps) => {
  const color = isActive ? 'error' : 'gray600';

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={isActive ? LIKE_BUTTON_ARIA.UNLIKE : LIKE_BUTTON_ARIA.LIKE}
      onClick={onToggle}
    >
      <Icon
        name={isActive ? 'heart_fill' : 'heart'}
        width={width}
        height={height}
        color={color}
      />
    </button>
  );
};

export default LikeButton;
