import { Icon } from '../../icons';

import * as styles from './avatar.css';

interface AvatarProps {
  size: 'sm' | 'md' | 'lg';
  src?: string; // 추후 api 연동시 Optional로 되어있는 것을 Required로 바꿀 생각입니다.
  alt?: string; // 이것도
  fallback?: string;
  className?: string;
}

const Avatar = ({
  className,
  src,
  alt,
  size,
  fallback,
  ...props
}: AvatarProps) => {
  const renderFallback = !src && !fallback && (
    <Icon name="profile_none" className={styles.imgVariants()} />
  );

  return (
    <div
      className={[styles.avatarVariants({ size }), className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.imgVariants()} />
      ) : (
        renderFallback || <span className={styles.fallback()}>{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
