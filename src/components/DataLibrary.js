/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
import {
  getUser,
  queryDatasetsMount,
  queryDatasetsCategory,
  scanDatasets,
} from '../database/databaseCalls';
import DataLibraryCard from './DataLibraryCard';
import DatasetSideNav from './DatasetSideNav';
import BottomNav from './BottomNav';
import LoadingScreen from '../UtilityComponents/LoadingScreen';

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
      sortedCategory: 'All',
      allDatasets: null,
      categoryIsChosen: false,
      categoriesNotSet: true,
      style: {
        width: 0,
      },
      clickedDataset: null,
      toDisplayDataset: null,
      currentUser: null,
      currentUserDatasetsPurchased: [],
      currentSearchTerm: null,
      searchTermInput: false,
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

    Auth.currentSession()
      .then((data) => {
        const name = data.accessToken.payload.username;
        this.setState({ currentUser: name });

        const getUserCallback = (success, error) => {
          if (error) {
            console.log(error);
          } else if (success.Items[0].datasets_purchased) {
            const newList = [];
            for (const datasetName of success.Items[0].datasets_purchased.L) {
              console.log(datasetName.S);
              newList.push(datasetName.S);
            }
            this.setState({ currentUserDatasetsPurchased: newList });
          }
        };
        getUser(getUserCallback, name);
      });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

  categoryOnClickFunction = (category) => {
    if (category === 'All') { // get rid of display when user wants no organization
      this.setState({ categoryIsChosen: false });
      this.setState({ sortedCategory: 'All' });
    } else { // we have chosen a category by which to sort
      this.setState({ categoriesNotSet: true });
      this.setState({ categoryIsChosen: true });
      this.setState({ sortedCategory: category });
    }
    if (this.state.searchTermInput) this.setState({ searchTermInput: false });
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

  checkIfAlreadyPurchased = (dataset) => {
    if (dataset && this.state.currentUserDatasetsPurchased) {
      for (const purchased of this.state.currentUserDatasetsPurchased) {
        if (String(purchased) === String(dataset.dataset_id.S)) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  searchBarOnChange = (e) => {
    this.setState({ currentSearchTerm: e.target.value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.state.categoryIsChosen) this.setState({ categoryIsChosen: false });
      if (this.state.currentSearchTerm && this.state.currentSearchTerm !== '') {
        document.getElementById('searchbar').value = '';
        this.setState({ searchTermInput: true });
        const workingSearchTerm = this.state.currentSearchTerm;
        this.setState({ finalizedSearchTerm: workingSearchTerm });
      }
    }
  }

  // side nav
  openNav(datasetId) {
    this.setState({ style: { width: 350 } });
    this.setState({ clickedDataset: datasetId });
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
  }

  renderDatasetsInCategory = () => {
    if (!this.state.inCategory) {
      return <LoadingScreen />;
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
      return <LoadingScreen />;
    }

    if (this.state.categoriesNotSet) {
      const callbackQuery = (data, error) => {
        if (error) {
          console.log(error);
        } else {
          this.setState({ inCategory: data });
        }
      };
      queryDatasetsCategory(callbackQuery, this.state.sortedCategory);
      const callbackScan = (data, error) => {
        if (error) {
          console.log(error);
        } else {
          this.setState({ outCategory: data });
        }
      };
      scanDatasets(callbackScan);
      this.setState({ categoriesNotSet: false });
    }

    return (
      <div>
        <div>{this.renderDatasetsInCategory()}</div>
        {/* <div>{this.renderDatasetsOutOfCategory()}</div> */}
      </div>
    );
  };

  renderSearchBar = () => {
    return (
      <input type="text" id="searchbar" placeholder="dataset name" onKeyPress={this.handleKeyPress} onChange={(e) => this.searchBarOnChange(e)} />
    );
  }

  renderSearchTermDatasets = () => {
    const searchTerm = this.state.finalizedSearchTerm;
    const allMatchingDatasets = this.state.allDatasets.Items.reduce((finalDatasets, dataset) => {
      if (dataset.app.S.includes(searchTerm)) {
        finalDatasets.push(
          <DataLibraryCard
            onClick={this.openNav}
            app={dataset.app.S}
            num_devices={dataset.num_devices.N}
            category={dataset.category.S}
            dataset_id={dataset.dataset_id.S}
          />,
        );
      }
      return finalDatasets;
    }, []);
    if (this.state.categoryIsChosen) this.setState({ categoryIsChosen: false });
    if (allMatchingDatasets.length > 0) {
      return (
        <div>{allMatchingDatasets}</div>
      );
    } else {
      return <div>No Datasets matching that pattern</div>;
    }
  }

  // get all unique categories for all datasets available
  renderUniqueCategories = () => {
    if (!this.state.allDatasets) {
      return 'No datasets found';
    }

    const allCategories = this.state.allDatasets.Items.map((dataset) => {
      return dataset.category.S;
    });

    const allUniqueCategories = [...new Set(allCategories)];
    allUniqueCategories.unshift('All');

    const allCategoryButtons = allUniqueCategories.map((category) => {
      const styleObj = {
        fontWeight: 900,
        display: 'block',
      };
      return (
        <div
          aria-hidden="true"
          className="categoryButton"
          onClick={() => this.categoryOnClickFunction(category)} // onclick will revamp catalog as sorted
        >
          {category === this.state.sortedCategory ? <> <div>&#9660;</div><div style={styleObj}>{category}</div></> : category}
        </div>
      );
    });
    return <><hr /><div className="categories-and-searchbar"><div>{allCategoryButtons}</div>{this.renderSearchBar()}</div><hr /></>;
  };

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    this.getDisplayDataset();
    const alreadyPurchased = this.checkIfAlreadyPurchased(this.state.toDisplayDataset);
    // if we have a category, render in-category and out-of-category datasets separately.
    return (
      <>
        <div className="body">
          <h1>Data Library</h1>
          {this.renderUniqueCategories()}
          <br />
          {this.state.categoryIsChosen
            ? <div>{this.renderAllDatasets()}</div>
            : (
              <div>{this.state.searchTermInput
                ? this.renderSearchTermDatasets()
                : this.mountDisplayDatasets()}
              </div>
            )}
          <div>
            <DatasetSideNav
              content={this.state.toDisplayDataset}
              onClick={this.closeNav}
              style={this.state.style}
              alreadyPurchased={alreadyPurchased}
              currentUser={this.state.currentUser}
            />
          </div>
        </div>
        <BottomNav style={{ position: 'absolute', bottom: '0px' }} />
      </>
    );
  }
}

export default DataLibrary;
