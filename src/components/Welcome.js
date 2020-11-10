import React from 'react';
import '../style.scss';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

const Welcome = () => {
  return (
    <>
      <div className="body">
        <h1>Distributed data, democratized.</h1>
        <p>
          <i>
            One single platform connects you to data from dozens of public applications through a secure, federated architecture.
            <br />
            Build, iterate, and access the exact datasets you need to generate insights.
          </i>
        </p>
      </div>
      <div className="landing" />
    </>
  );
};

export default Welcome;
