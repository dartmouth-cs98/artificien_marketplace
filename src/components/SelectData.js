import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

const SelectData = () => {
  return (
    <div>
      <h1>Select Data Page</h1>
      <p>To be filled in later</p>
      <Link to="/data_library">
        <button type="button">
          Go to Data Library
        </button>
      </Link>
    </div>

  );
};

export default SelectData;
