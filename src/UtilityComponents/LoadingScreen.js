import React from 'react';
import LoadingIcon from './LoadingIcon';

const LoadingScreen = (props) => {
  return (
    <>
      <div style={{ width: '100%', height: '100vh', background: 'white' }}>
        <div style={{
          position: 'relative',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20vw',
        }}
        >
          <LoadingIcon />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
