import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import Models from './Models';
import SelectData from './SelectData';
import Welcome from './Welcome';
import Navbar from './Navbar';

const DataLibrary = () => {
    return (
        <div>
            <h1>Data Library Page</h1>
            <p>To be filled in later</p>
            <Link to='/models'><Button color="#123456">
              Go to Models
            </Button>
            </Link>
       </div>
       
    );
};

export default DataLibrary;
