import React, { Component } from 'react';
import '../style.scss';
import {
  queryDatasetsMount,
  queryDatasetsCategory,
  scanDatasets,
} from '../database/databaseCalls';
import DataLibraryCard from './DataLibraryCard';
import DatasetSideNav from './DatasetSideNav';

/*
Component that renders library of all available datasets to shoppers
Calls on subcomponents of:
  - DatasetSideNav
  - DataLibraryCard
*/

class DataLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCategory: null,
      outCategory: null,
      sortedCategory: null,
      allDatasets: null,
      categoryIsChosen: false,
      categoriesNotSet: true,
      style: {
        width: 0,
      },
      clickedDataset: null,
      toDisplayDataset: null,
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    const callbackMount = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ allDatasets: data }); // display all datasets in db as catalog
      }
    };
    queryDatasetsMount(callbackMount);
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

  categoryOnClickFunction = (category) => {
    if (category === 'No Category') { // get rid of display when user wants no organization
      this.setState({ categoryIsChosen: false });
      this.setState({ sortedCategory: null });
    } else { // we have chosen a category by which to sort
      this.setState({ categoriesNotSet: true });
      this.setState({ categoryIsChosen: true });
      this.setState({ sortedCategory: category });
    }
  };

  mountDisplayDatasets = () => {
    if (!this.state.allDatasets) {
      return 'No datasets found in category';
    }

    // for array
    const renderedDatasets = this.state.allDatasets.Items.map((dataset) => { // make a card for all datasets
      return (
        <DataLibraryCard
          key={Math.random()}
          onClick={this.openNav}
          app={dataset.app.S}
          num_devices={dataset.num_devices.N}
          category={dataset.category.S}
          dataset_id={dataset.dataset_id.S}
        />
      );
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">All Datasets</h2>
        <span className="card-holder wrap">{renderedDatasets}</span>
      </div>
    );
    return renderedDatasetTable;
  };

  getDisplayDataset = () => {
    if (this.state.clickedDataset) {
      let toDisplayTemp = null;
      for (let i = 0; i < this.state.allDatasets.Items.length; i += 1) {
        if (
          this.state.allDatasets.Items[i].dataset_id.S === this.state.clickedDataset // iterating over all datasets, we've found the currently-clicked-on dataset
        ) {
          toDisplayTemp = this.state.allDatasets.Items[i];
          this.setState({ toDisplayDataset: toDisplayTemp });
          this.setState({ clickedDataset: null });
        }
      }
    }
  };

  // side nav
  openNav(datasetId) {
    this.setState({ style: { width: 350 } });
    console.log(datasetId);
    this.setState({ clickedDataset: datasetId });
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    console.log('bongo');
    const style = { width: 0 };
    this.setState({ style });
  }

  renderDatasetsInCategory = () => {
    if (!this.state.inCategory) {
      return 'No datasets found in category';
    }
    // make cards for datasets in category by sort
    const renderedDatasets = this.state.inCategory.Items.map((dataset) => {
      if (dataset.category.S === this.state.sortedCategory) {
        return (
          <DataLibraryCard
            key={Math.random()}
            onClick={this.openNav}
            app={dataset.app.S}
            num_devices={dataset.num_devices.N}
            category={dataset.category.S}
            dataset_id={dataset.dataset_id.S}
          />
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">
          From Category: <i>{this.state.sortedCategory}</i>
        </h2>
        <div className="card-holder wrap">{renderedDatasets}</div>
      </div>
    );
    return renderedDatasetTable;
  };

  renderDatasetsOutOfCategory = () => {
    if (!this.state.outCategory) {
      return 'No datasets found out of category';
    }
    if (!this.state.sortedCategory) {
      return null;
    }

    // make cards for datasets out of category by sort
    const renderedDatasets = this.state.outCategory.map((dataset) => {
      if (dataset.category.S !== this.state.sortedCategory) {
        return (
          <DataLibraryCard
            key={Math.random()}
            onClick={this.openNav}
            app={dataset.app.S}
            num_devices={dataset.num_devices.N}
            category={dataset.category.S}
            dataset_id={dataset.dataset_id.S}
          />
        );
      }
      return null;
    });

    const renderedDatasetTable = (
      <div>
        <h2 align="left">Remaining Datasets</h2>
        <div className="card-holder wrap">{renderedDatasets}</div>
      </div>
    );
    return renderedDatasetTable;
  };

  renderAllDatasets = () => {
    if (!this.state.sortedCategory) {
      return null;
    }

    if (this.state.categoriesNotSet) {
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
      this.setState({ categoriesNotSet: false });
    }

    return (
      <div>
        <div>{this.renderDatasetsInCategory()}</div>
        <div>{this.renderDatasetsOutOfCategory()}</div>
      </div>
    );
  };

  // get all unique categories for all datasets available
  renderUniqueCategories = () => {
    if (!this.state.allDatasets) {
      return 'No datasets found';
    }

    const allCategories = this.state.allDatasets.Items.map((dataset) => {
      return dataset.category.S;
    });
    const allUniqueCategories = [...new Set(allCategories)];
    allUniqueCategories.push('No Category');

    const allCategoryButtons = allUniqueCategories.map((category) => {
      // each category goes to a button
      return (
        <button
          type="button"
          className="categoryButton"
          onClick={() => this.categoryOnClickFunction(category)} // onclick will revamp catalog as sorted
        >
          {category}
        </button>
      );
    });
    return <div>{allCategoryButtons}</div>;
  };

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    this.getDisplayDataset();
    if (!this.state.categoryIsChosen) {
      // if we have a category, render in-category and out-of-category datasets separately.
      return (
        <div className="body">
          <h1>Data Library</h1>
          <h3>
            <i>Categories</i>
          </h3>
          <div>{this.renderUniqueCategories()}</div>
          <br />
          <div>{this.mountDisplayDatasets()}</div>
          <div>
            <DatasetSideNav
              content={this.state.toDisplayDataset}
              onClick={this.closeNav}
              style={this.state.style}
            />
          </div>
        </div>
      );
    } else {
      // if we don't have a category yet, just render all datasets
      return (
        <div className="body">
          <h1>Data Library</h1>
          <h3>
            <i>Categories</i>
          </h3>
          <div>{this.renderUniqueCategories()}</div>
          <br />
          <div>{this.renderAllDatasets()}</div>
          <div>
            <DatasetSideNav
              content={this.state.toDisplayDataset}
              onClick={this.closeNav}
              style={this.state.style}
            />
          </div>
        </div>
      );
    }
  }
}

export default DataLibrary;
