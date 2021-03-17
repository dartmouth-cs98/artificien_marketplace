import React, { Component } from 'react';
import { getModel } from '../database/databaseCalls';
import '../style.scss';

/*
Right-side slide-out component that displays more in-depth information about model.
Rendered when user clicks on modelDetailsCard component
*/

class ModelSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadURL: null,
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    const getModelCallback = (data, error) => {
      if (error) {
        console.log(error);
      } else if (data.Item.download_link) this.setState({ downloadURL: data.Item.download_link.S });
    };

    if (!this.props.content) {
      // placeholder for concealed slideout menu
      return (
        <div className="overlay" style={this.props.style}>
          <h3>Oops!</h3>
        </div>
      );
    }

    if (this.props.content) getModel(getModelCallback, this.props.content.model_id.S);

    // If we've got the url to go to a completed model, show button to download it
    return (
      <div className="overlay" style={this.props.style}>
        <div className="sidenav-container">
          <button type="button" className="data-card-button" onClick={this.props.onClick}>x</button>
          <div className="text-center">
            <h2>{this.props.content.model_id.S}</h2>
            <p>Model started: {this.props.content.date_submitted.S}</p>
            <p>Training on: {this.props.content.dataset.S}</p>
            <p>Percent Complete: {this.props.content.percent_complete.N}%</p>
            {this.props.content.loss_this_cycle && <p>Loss: {String(this.props.content.loss_this_cycle.N).slice(0, 8)}</p>}
          </div>
          <div>{parseInt(this.props.content.percent_complete.N, 10) === 100
            ? (
              <div>{this.state.downloadURL
                ? <a href={this.state.downloadURL} className="rtrvbtn" rel="noreferrer" target="_blank">Download Model</a> // a here should be linked to the db URL
                : <p>Not ready to download yet!</p>}
              </div>
            )
            : <p>Not ready to download yet</p>}
          </div>
          <div className="list-group" />
        </div>
      </div>
    );
  }
}

export default ModelSideNav;
