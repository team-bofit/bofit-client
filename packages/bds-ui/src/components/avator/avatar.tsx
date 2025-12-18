import { Icon } from '../../icons';

import * as styles from './avatar.css';

interface AvatarProps {
  size: 'sm' | 'md' | 'lg';
  src?: string;
  alt?: string;
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
    <Icon name="profile" className={styles.imgVariants()} />
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
