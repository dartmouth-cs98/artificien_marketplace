import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import * as ReactBootstrap from 'react-bootstrap';
import { queryDatasetsMount, queryDatasetsCategory, scanDatasets } from '../databaseCalls';

class DataLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCategory: null,
      outCategory: null,
      sortedCategory: null,
      allDatasets: null,
    };
  }

  componentDidMount() {
    const callbackMount = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ allDatasets: data });
      }
    };
    queryDatasetsMount(callbackMount);
  }

  mountDisplayDatasets = () => {
    if (!this.state.allDatasets) { return 'No datasets found in category'; }

    // for array
    const renderedDatasets = this.state.allDatasets.Items.map((dataset) => {
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
            <ReactBootstrap.Button>Learn More</ReactBootstrap.Button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      );
    });

    const renderedDatasetTable = (
      <div>
        <div>
          {renderedDatasets}
        </div>
      </div>
    );
    return renderedDatasetTable;
  }

  // original componentDidMount method:

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
              <ReactBootstrap.Button>Learn More</ReactBootstrap.Button>
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
              <ReactBootstrap.Button>Learn More</ReactBootstrap.Button>
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

  renderAllDatasets = () => {
    if (!this.state.sortedCategory) { return null; }

    const callbackQuery = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ inCategory: data });
      }
    };
    queryDatasetsCategory(callbackQuery, this.state.sortedCategory);

    const callbackScan = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ outCategory: data });
      }
    };
    scanDatasets(callbackScan);

    return (
      <div>
        <div>{this.renderDatasetsInCategory()}</div>
        <div>{this.renderDatasetsOutOfCategory()}</div>
      </div>
    );
  }

  activateLasers = (e) => {
    e.preventDefault();
    console.log('bingus');
  }

  // renderDropDownTest = () => {
  //   return (
  //     <ReactBootstrap.DropdownButton menuAlign="right" title="Dropdown right" id="dropdown-menu-align-right">
  //       <ReactBootstrap.Dropdown.Item eventKey="1">Action</ReactBootstrap.Dropdown.Item>
  //       <ReactBootstrap.Dropdown.Item eventKey="2">Another action</ReactBootstrap.Dropdown.Item>
  //       <ReactBootstrap.Dropdown.Item eventKey="3">Something else here</ReactBootstrap.Dropdown.Item>
  //       <ReactBootstrap.Dropdown.Divider />
  //       <ReactBootstrap.Dropdown.Item eventKey="4">Separated link</ReactBootstrap.Dropdown.Item>
  //     </ReactBootstrap.DropdownButton>
  //   );
  // }

  // renderDropdown = () => {
  //   const categoryDropdown = (
  //     <div className="dropdown">
  //       <span>Mouse over me</span>
  //       <div className="dropdown-content">
  //         <p>Hello World!</p>
  //       </div>
  //     </div>
  //   );
  //   return categoryDropdown;
  // }

  categoryOnClickFunction = (category) => {
    console.log(category);
    this.setState({ sortedCategory: category });
  }

  renderUniqueCategories = () => {
    if (!this.state.allDatasets) { return ('No datasets found'); }

    const allCategories = this.state.allDatasets.Items.map((dataset) => {
      return (dataset.category.S);
    });
    const allUniqueCategories = [...new Set(allCategories)];
    console.log(allUniqueCategories);

    const allCategoryButtons = allUniqueCategories.map((category) => {
      return (
        <button type="button" onClick={() => this.categoryOnClickFunction(category)}>{category}</button>
      );
    });

    const allCategoriesDiv = (<div>{allCategoryButtons}</div>);
    return allCategoriesDiv;
  }

  render() {
    return (
      <div className="body">
        <br />
        <br />
        <h1>Data Library</h1>
        {/* <ReactBootstrap.Button variant="primary" onClick={(e) => this.activateLasers(e)}>Activate Lasers</ReactBootstrap.Button> */}
        <br />
        {/* <div>{this.renderDatasetsInCategory()}</div>
        <div>{this.renderDatasetsOutOfCategory()}</div> */}
        <div>{this.mountDisplayDatasets()}</div>
        <div>{this.renderUniqueCategories()}</div>
        <div>{this.renderAllDatasets()}</div>
      </div>
    );
  }
}

export default DataLibrary;
