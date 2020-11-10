import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';
// import { Button } from 'reactstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import { queryDatasets, scanDatasets } from '../databaseCalls';
import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

class SelectData extends Component {
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
          <ReactBootstrap.Card className="cardholder" style={{ width: '22rem' }}>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title as="h1">{dataset.app.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                {dataset.num_devices.N} Users
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Card.Text>
                {dataset.category.S}
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button>Select Data</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h1 align="left">From Category {this.state.sortedCategory}</h1>
        <div>
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
          <ReactBootstrap.Card className="cardholder" style={{ width: '22rem' }}>
            <ReactBootstrap.Card.Body>
              <ReactBootstrap.Card.Title as="h1">{dataset.app.S}</ReactBootstrap.Card.Title>
              <ReactBootstrap.Card.Text>
                {dataset.num_devices.N} Users
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Card.Text>
                {dataset.category.S}
              </ReactBootstrap.Card.Text>
              <ReactBootstrap.Button>Select Data</ReactBootstrap.Button>
            </ReactBootstrap.Card.Body>
          </ReactBootstrap.Card>
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h1 align="left">Other Datasets</h1>
        <div>
          {renderedDatasets}
        </div>
      </div>
    );
    return renderedDatasetTable;
  }

  render() {
    return (
      <div className="body">
        <br />
        <br />
        <h1>New Model</h1>
        <br />
        <div>{this.renderDatasetsInCategory()}</div>
        <div>{this.renderDatasetsOutOfCategory()}</div>
      </div>
    );
  }
}

export default SelectData;
