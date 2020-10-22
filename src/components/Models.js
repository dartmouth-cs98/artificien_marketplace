import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Models = () => {
  return (
    <div>
      <h1>Models Page</h1>
      <p>To be filled in later</p>
      <Link to="/select_data">
        <Button color="#cccccc">
          Go to Select Data Page
        </Button>
      </Link>
    </div>

  );
};

export default Models;
