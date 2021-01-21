import React from 'react';
// import { connect } from 'react-redux';
import LoadingIcon from './LoadingIcon';
// import LoadedIcon from './LoadedIcon';
// import Navbar from '../components/Navbar';

const LoadingScreen = (props) => {
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ width: '100%', height: '100vh', background: 'white' }}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
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
