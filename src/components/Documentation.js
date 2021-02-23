/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
import DocumentationDrawer from './DocumentationDrawer';
import { queryDatasetsOwner } from '../database/databaseCalls';
import BottomNav from './BottomNav';
// import PersistentDrawerLeft from './PersistentDrawerLeft';

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('mounted');

    Auth.currentSession()
      .then((data) => {
        const name = data.accessToken.payload.username;

        const datasetCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            this.setState({ userDataset: success.Items[0] });
          }
        };
        queryDatasetsOwner(datasetCallback, name);
      });
  }

  render() {
    return (
      <>
        <div className="body">
          <DocumentationDrawer userDataset={this.state.userDataset} />
        </div>
        <BottomNav style={{ position: 'absolute', bottom: '0px' }} />
      </>
    );
  }
}

export default Documentation;
