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

  return <Lottie loop animationData={modifiedAnimationData} />;
};

export default Loading;
