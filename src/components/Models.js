import React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

const Models = () => {
  return (
    <div>
      <h1>Models Page</h1>
      <Link to="/SelectData">
        <button type="button">
          Upload New Model
        </button>
      </Link>
      <h1 align="left">In Progress</h1>
      <table width="100%">
        <tr>
          <th>NAME</th>
          <th>DATE SUBMITTED</th>
          <th>DATASETS</th>
          <th>PROGRESS</th>
        </tr>
        <tr>
          <td>Buying Habits v1</td>
          <td>10/14/20</td>
          <td>Ebay (items purchased)</td>
          <td>69%</td>
        </tr>
        <tr>
          <td>Health Level Predictor</td>
          <td>10/12/20</td>
          <td>Fitbit (heartrate, Step count)</td>
          <td>77%</td>
        </tr>
      </table>
      <h1 align="left">Completed</h1>
      <table width="100%">
        <tr>
          <th>NAME</th>
          <th>DATE SUBMITTED</th>
          <th>DATASETS</th>
          <th>PROGRESS</th>
        </tr>
        <tr>
          <td>Filler</td>
          <td>Help</td>
          <td>Items</td>
          <td>xx%</td>
        </tr>
        <tr>
          <td>Filler</td>
          <td>Help</td>
          <td>Items</td>
          <td>xx%</td>
        </tr>
        <tr>
          <td>Filler</td>
          <td>Help</td>
          <td>Items</td>
          <td>xx%</td>
        </tr>
        <tr>
          <td>Filler</td>
          <td>Help</td>
          <td>Items</td>
          <td>xx%</td>
        </tr>
      </table>

    </div>

  );
};

export default Models;
