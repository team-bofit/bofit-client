import { Icon } from '@bds/ui/icons';

const LIKE_BUTTON_ARIA = {
  LIKE: '좋아요',
  UNLIKE: '좋아요 취소',
};

interface LikeButtonProps {
  width: number | string;
  height: number | string;
  onToggle?: () => void;
  liked: boolean;
}

const LikeButton = ({ width, height, onToggle, liked }: LikeButtonProps) => {
  const color = liked ? 'error' : 'gray600';

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? LIKE_BUTTON_ARIA.UNLIKE : LIKE_BUTTON_ARIA.LIKE}
      onClick={onToggle}
    >
      <Icon
        name={liked ? 'heart_fill' : 'heart'}
        width={width}
        height={height}
        color={color}
      />
    </button>
  );
};

export default LikeButton;
