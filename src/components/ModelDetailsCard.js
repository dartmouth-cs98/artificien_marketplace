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
    if (parseInt(this.props.percent_complete, 10) === 100) { // completed
      return (
        // onclick, function will initiate recall of model from PyGrid node
        <div className="model-card">
          <div className="models-completed-headers">
            <p id="model-p">{this.props.model_id} </p>
            <p id="model-p">{this.props.date_submitted}</p>
            <p id="model-p">{this.props.dataset}</p>
            {parseInt(this.props.percent_complete, 10) === 100 ? <p id="model-p">Success</p> : <p id="model-p">Error</p>}
          </div>
          {parseInt(this.props.percent_complete, 10) === 100
            ? (
              <button type="button" className="model-card-success-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>)
            : (<button type="button" className="model-card-failure-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Error &rarr;</button>)}
        </div>
      );
    } else {
      return (
        // onclick, function will initiate recall of model from PyGrid node
        <div className="model-card">
          <div className="models-completed-headers">
            <p id="model-p">{this.props.model_id} </p>
            <p id="model-p">{this.props.date_submitted}</p>
            <p id="model-p">{this.props.dataset}</p>
            <p id="model-p">{this.props.percent_complete}%</p>
          </div>
          <button type="button" className="model-card-success-button" tabIndex={0} onClick={() => this.props.onClick(this.props.model_id)}>View Model &rarr;</button>
        </div>
      );
    }
  }
}

export default ModelDetailsCard;
