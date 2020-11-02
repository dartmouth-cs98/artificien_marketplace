import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import { queryModels } from '../databaseCalls';
import ModelDetailsCard from './ModelDetailsCard';
import ModelSideNav from './ModelSideNav';

class Models extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
      current_user: 'QUILL',
      style: {
        width: 0,
      },
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ models: data });
      }
    };
    queryModels(callback, this.state.current_user);
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

  openNav() {
    this.setState({ style: { width: 350 } });
    console.log('bingus');
    // document.addEventListener('click', this.closeNav);
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    console.log('bongo');
    const style = { width: 0 };
    this.setState({ style });
    // document.body.style.backgroundColor = '#F3F3F3';
  }

  renderModelsInProgress = () => {
    if (!this.state.models) { return 'No in progress models found'; }

    // for array
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '1') {
        return (
          <ModelDetailsCard onClick={this.openNav}
            key={Math.random()}
            model_id={model.model_id.S}
            date_submitted={model.date_submitted.S}
            percent_complete={model.percent_complete.N}
          />
        );
      }
      return null;
    });

    const renderedModelTable = (
      <div>
        <h2 align="left">In Progress</h2>
        <div className="card-holder">
          {renderedModels}
        </div>
      </div>
    );
    return renderedModelTable;
  }

  renderModelsCompleted = () => {
    if (!this.state.models) { return 'No finished models found'; }

    // for array
    const renderedModels = this.state.models.Items.map((model) => {
      if (model.active_status.N === '0') {
        return (
          <ModelDetailsCard onClick={this.openNav}
            key={Math.random()}
            model_id={model.model_id.S}
            date_submitted={model.date_submitted.S}
            percent_complete={model.percent_complete.N}
          />
        );
      }
      return null;
    });

    const renderedModelTable = (
      <div>
        <h2 align="left">Completed</h2>
        <div className="card-holder">
          {renderedModels}
        </div>
      </div>
    );
    return renderedModelTable;
  }

  render() {
    return (
      <div className="body">
        <div>
          <h1 align="center">Models Page</h1>
          <div>{this.renderModelsInProgress()}</div>
          <div>{this.renderModelsCompleted()}</div>
        </div>
        <div>
          <ModelSideNav onClick={this.closeNav} style={this.state.style} />
        </div>
      </div>
    );
  }
}

export default Models;
