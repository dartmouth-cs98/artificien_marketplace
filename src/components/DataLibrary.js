import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
// import { Button } from 'reactstrap';

class DataLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to="/select_data">
          <button type="button">
            Upload New Model
          </button>
        </Link>
        <br />
        <br />
        <h1 align="left">Data Library</h1>
        <h3 align="right">TL NOTE: Dropdown here; need to move it to same line</h3>
        <br />
        <table width="100%">
          <tr>
            <th>BUSINESS</th>
            <th>TYPE</th>
          </tr>
          <tr>
            <td>Robinhood</td>
            <td>Financial</td>
          </tr>
          <tr>
            <td>Mint</td>
            <td>Financial</td>
          </tr>
          <tr>
            <td>Amazon</td>
            <td>eCommerce</td>
          </tr>
          <tr>
            <td>Personal Capital</td>
            <td>Financial</td>
          </tr>
          <tr>
            <td>Wealthfront</td>
            <td>Financial</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default DataLibrary;
