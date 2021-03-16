import React, { Component } from 'react';
import '../style.scss';

/*
Simple component that displays specifics of model selected from user model dashboard
*/
class ModelDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    if (parseInt(this.props.percent_complete, 10) !== 100) { // in progress
      return (
        // onclick, function will initiate recall of model from PyGrid node
        <div className="model-card">
          <div className="models-inprogress-card-content">
            <p id="model-p-progress">{this.props.model_id} </p>
            <p id="model-p-progress">{this.props.date_submitted}</p>
            <p id="model-p-progress">{this.props.dataset}</p>
            <p id="model-p-progress">{this.props.percent_complete}%</p>
            {/* <p id="model-p-progress">{this.props.accuracy}%</p> */}
            <p id="model-p-progress">{String(this.props.loss).slice(0, 8)}</p>
          </div>
          <button type="button" className="model-card-success-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>
        </div>
      );
    } else {
      return (
        <div className="model-card">
          <div className="models-completed-card-content">
            <p id="model-p-complete">{this.props.model_id} </p>
            <p id="model-p-complete">{this.props.date_submitted}</p>
            <p id="model-p-complete">{this.props.dataset}</p>
            <p id="model-p-complete">Success</p>
          </div>
          {parseInt(this.props.percent_complete, 10) === 100
            ? (
              <button type="button" className="model-card-success-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>)
            : (<button type="button" className="model-card-failure-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Error &rarr;</button>)}
        </div>
      );
    }
  }
}

export default ModelDetailsCard;
