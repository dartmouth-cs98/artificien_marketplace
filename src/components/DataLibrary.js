import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';// import { Button } from 'reactstrap';
import { queryDatasets, scanDatasets } from '../databaseCalls';

class DataLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCategory: null,
      outCategory: null,
      sortedCategory: 'Health',
    };
  }

  componentDidMount() {
    const callbackQuery = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ inCategory: data });
      }
    };
    queryDatasets(callbackQuery, this.state.sortedCategory);

    const callbackScan = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ outCategory: data });
      }
    };
    scanDatasets(callbackScan);
  }

  renderDatasetsInCategory = () => {
    if (!this.state.inCategory) { return 'No datasets found in category'; }

    // for array
    const renderedDatasets = this.state.inCategory.Items.map((dataset) => {
      if (dataset.category.S === this.state.sortedCategory) {
        return (
          <ReactBootstrap.Card style={{ width: '18rem' }}>
            <ReactBootstrap.Card.Img className="cardimg" variant="top" src="./Artificien.png" />
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>{dataset.app.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                A dataset pulled from {dataset.app.S} on {dataset.num_devices.N} devices
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">Use this data</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h1 align="left">From Category {this.state.sortedCategory}</h1>
        <div className="cardHolder">
          {renderedDatasets}
        </div>
      </div>
    );
    return renderedDatasetTable;
  }

  renderDatasetsOutOfCategory = () => {
    if (!this.state.outCategory) { return 'No datasets found out of category'; }

    // for array
    const renderedDatasets = this.state.outCategory.map((dataset) => {
      if (dataset.category.S !== this.state.sortedCategory) {
        return (
          <ReactBootstrap.Card style={{ width: '18rem' }}>
            <ReactBootstrap.Card.Img className="cardimg" variant="top" src="./Artificien.png" />
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title>{dataset.app.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                A dataset pulled from {dataset.app.S} on {dataset.num_devices.N} devices
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button variant="primary">Use this data</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h1 align="left">Other datasets</h1>
        <div className="cardHolder">
          {renderedDatasets}
        </div>
      </div>
    );
    return renderedDatasetTable;
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <h1 align="center">Data Library</h1>
        <br />
        <div>{this.renderDatasetsInCategory()}</div>
        <div>{this.renderDatasetsOutOfCategory()}</div>
      </div>
    );
  }
}

export default DataLibrary;
