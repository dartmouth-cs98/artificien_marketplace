import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/homepage_icon.json';

/*
DEPRECATED again in favor of nice shreyas drawing
*/

function HomepageIcon(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default HomepageIcon;
