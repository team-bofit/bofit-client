import Lottie from 'lottie-react';

import loadingAnimation from '@shared/assets/glass_icon_logo_animation.json';

const Loading = () => {
  const modifiedAnimationData = {
    ...loadingAnimation,
    assets: loadingAnimation.assets.map((asset) => ({
      ...asset,
      u: '',
    })),
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100svh',
      }}
    >
      <Lottie
        loop
        animationData={modifiedAnimationData}
        autoPlay
        style={{
          width: '20.5rem',
          height: '20.5rem',
        }}
      />
    </div>
  );
};

export default Loading;
