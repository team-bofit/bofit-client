import { Icon } from '@bds/ui/icons';

interface LikeButtonProps {
  width: number | string;
  height: number | string;
  onToggle?: () => void;
  isActive: boolean;
  areaLabelWhenActive?: string;
  areaLabelWhenInActive?: string;
}

const LikeButton = ({
  width,
  height,
  onToggle,
  isActive,
  areaLabelWhenActive,
  areaLabelWhenInActive,
}: LikeButtonProps) => {
  return (
    <button
      type="button"
      aria-label={isActive ? areaLabelWhenActive : areaLabelWhenInActive}
      onClick={onToggle}
    >
      <Icon
        name={isActive ? 'heart_fill' : 'heart'}
        width={width}
        height={height}
        color={isActive ? 'error' : 'gray600'}
      />
    </button>
  );
};

export default LikeButton;
