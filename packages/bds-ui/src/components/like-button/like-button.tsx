import { Icon } from '@bds/ui/icons';

import { iconVariants } from './like-button.css';

interface LikeButtonProps {
  width: string;
  height: string;
  onToggle?: () => void;
  isActive: boolean;
  ariaLabelWhenActive?: string;
  ariaLabelWhenInActive?: string;
}

const LikeButton = ({
  width,
  height,
  onToggle,
  isActive,
  ariaLabelWhenActive,
  ariaLabelWhenInActive,
}: LikeButtonProps) => {
  return (
    <button
      type="button"
      aria-label={isActive ? ariaLabelWhenActive : ariaLabelWhenInActive}
      onClick={onToggle}
    >
      <Icon
        name={isActive ? 'heart_fill' : 'heart'}
        width={width}
        height={height}
        className={iconVariants({ isActive })}
      />
    </button>
  );
};

export default LikeButton;
