import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';
// import { Button } from 'reactstrap';
import { getAllUsers } from '../databaseCalls';

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    const callback = (data, error) => {
      if (error) { console.log(error); }
      this.setState({ users: data });
    };
    getAllUsers(callback);
  }

  // Render each organization's details as a card
  renderUsers = () => {
    if (!this.state.users) { return 'No users found'; }

    const renderedUsers = this.state.users.map((user) => {
      return (
        <button type="button">{ user.enterprise.S }</button>
      );
    });
    return renderedUsers;
  }

  render() {
    return (
      <div>
        <div>{this.renderUsers()}</div>
        <div>
          <h1>Models Page</h1>
          <Link to="/select_data">
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
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Health Level Predictor</td>
              <td>10/12/20</td>
              <td>Fitbit (heartrate, Step count)</td>
              <td>77%</td>
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
            <br />
            <br />
          </table>
          <h1 align="left">Completed</h1>
          <table width="100%" style={{ float: 'left' }}>
            <tr>
              <th>NAME</th>
              <th>DATE SUBMITTED</th>
              <th>DATASETS</th>
              <th>PERCENT COMPLETED</th>
            </tr>
            <tr>
              <td>Filler</td>
              <td>Help</td>
              <td>Items</td>
              <td>xx%</td>
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Filler</td>
              <td>Help</td>
              <td>Items</td>
              <td>xx%</td>
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Filler</td>
              <td>Help</td>
              <td>Items</td>
              <td>xx%</td>
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Filler</td>
              <td>Help</td>
              <td>Items</td>
              <td>xx%</td>
              <td>
                <Link to="/select_data">
                  <button type="button">
                    View Model
                  </button>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>

    );
  }
}

export default Models;
