import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import { queryDatasetsMount, queryDatasetsCategory, scanDatasets } from '../databaseCalls';
import DataLibraryCard from './DataLibraryCard';

class DataLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCategory: null,
      outCategory: null,
      sortedCategory: null,
      allDatasets: null,
      categoryIsChosen: false,
    };
  }

  componentDidMount() {
    const callbackMount = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
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
        <DataLibraryCard app={dataset.app.S} num_devices={dataset.num_devices.N} category={dataset.category.S} />
      );
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">All Datasets</h2>
        <span className="card-holder">
          {renderedDatasets}
        </span>
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
          <DataLibraryCard app={dataset.app.S} num_devices={dataset.num_devices.N} category={dataset.category.S} />
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">From Category: <i>{this.state.sortedCategory}</i></h2>
        <div className="card-holder">
          {renderedDatasets}
        </div>
      </div>
    );
    return renderedDatasetTable;
  }

  renderDatasetsOutOfCategory = () => {
    if (!this.state.outCategory) { return 'No datasets found out of category'; }
    if (!this.state.sortedCategory) { return null; }

    // for array
    const renderedDatasets = this.state.outCategory.map((dataset) => {
      if (dataset.category.S !== this.state.sortedCategory) {
        return (
          <DataLibraryCard app={dataset.app.S} num_devices={dataset.num_devices.N} category={dataset.category.S} />
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">Remaining Datasets</h2>
        <div className="card-holder">
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
        // console.log(data);
        this.setState({ inCategory: data });
      }
    };
    queryDatasetsCategory(callbackQuery, this.state.sortedCategory);

    const callbackScan = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
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

  categoryOnClickFunction = (category) => {
    console.log(category);
    if (category === 'No Category') {
      this.setState({ categoryIsChosen: false });
      this.setState({ sortedCategory: null });
    } else {
      this.setState({ categoryIsChosen: true });
      this.setState({ sortedCategory: category });
    }
  }

  renderUniqueCategories = () => {
    if (!this.state.allDatasets) { return ('No datasets found'); }

    const allCategories = this.state.allDatasets.Items.map((dataset) => {
      return (dataset.category.S);
    });
    const allUniqueCategories = [...new Set(allCategories)];
    allUniqueCategories.push('No Category');

    const allCategoryButtons = allUniqueCategories.map((category) => {
      return (
        <button type="button" className="categoryButton" onClick={() => this.categoryOnClickFunction(category)}>{category}</button>
      );
    });

    const allCategoriesDiv = (<div>{allCategoryButtons}</div>);
    return allCategoriesDiv;
  }

  render() {
    if (!this.state.categoryIsChosen) {
      return (
        <div className="body">
          <h1>Data Library</h1>
          <h3><i>Categories</i></h3>
          <div>{this.renderUniqueCategories()}</div>
          <br />
          <div>{this.mountDisplayDatasets()}</div>
        </div>
      );
    } else {
      return (
        <div className="body">
          <h1>Data Library</h1>
          <h3><i>Categories</i></h3>
          <div>{this.renderUniqueCategories()}</div>
          <br />
          <div>{this.renderAllDatasets()}</div>
        </div>
      );
    }
  }
}

export default DataLibrary;
