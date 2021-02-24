/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
// import DocumentationDrawer from './DocumentationDrawer';
import { queryDatasetsOwner } from '../database/databaseCalls';
// import BottomNav from './BottomNav';
// import PersistentDrawerLeft from './PersistentDrawerLeft';
import CodeSnippet from './CodeSnippet';

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
      <div>
        <div className="documentationSidebar">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="documentation">
          {this.state.userDataset ? <CodeSnippet content={this.props.userDataset.app.S} /> : <CodeSnippet content="bingus" />}
        </div>
      </div>

    // <>
    //   <div className="body">
    //     <DocumentationDrawer userDataset={this.state.userDataset} />
    //   </div>
    //   <BottomNav style={{ position: 'absolute', bottom: '0px' }} />
    // </>
    );
  }
}

export default Documentation;
