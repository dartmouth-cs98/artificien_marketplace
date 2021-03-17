import React from 'react';
import HomepageIcon from './HomepageIcon';

/*
DEPRECATED in favor of nice shreyas drawing
*/

const HomepageAnimation = (props) => {
  return (
    <>
      <div style={{ width: '100%', height: '60vh', background: 'white' }}>
        <div style={{
          position: 'relative',
          top: '50%',
          height: '650px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '45%',
        }}
        >
          <HomepageIcon />
        </div>
      </div>
    </>
  );
};

export default HomepageAnimation;
