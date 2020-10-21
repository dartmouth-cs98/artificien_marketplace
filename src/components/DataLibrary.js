import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const DataLibrary = () => {
  return (
    <div>
      <h1>Data Library Page</h1>
      <p>To be filled in later</p>
      <Link to="/models">
        <Button color="#bbbbbb">
          Go to Models
        </Button>
      </Link>
    </div>

  );
};

export default DataLibrary;
