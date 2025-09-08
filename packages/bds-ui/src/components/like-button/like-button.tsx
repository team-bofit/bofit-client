import { Icon } from '@bds/ui/icons';

import { iconVariants } from './like-button.css';

interface LikeButtonProps {
  size: 'sm' | 'md';
  onToggle?: () => void;
  isActive: boolean;
  ariaLabelWhenActive?: string;
  ariaLabelWhenInActive?: string;
}

const LikeButton = ({
  size,
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
        size={iconVariants({ size })}
        className={iconVariants({ isActive })}
      />
    </button>
  );
};

export default LikeButton;
