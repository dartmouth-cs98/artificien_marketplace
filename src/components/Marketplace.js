/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import {
  getUser,
  queryDatasetsMount,
  queryDatasetsCategory,
  scanDatasets,
} from '../database/databaseCalls';
import DataLibraryCard from './DataLibraryCard';
import LoadingScreen from '../UtilityComponents/LoadingScreen';
import DatasetModal from '../UtilityComponents/DatasetModal';

/*
Component that renders library of all available datasets to shoppers
Calls on subcomponents of:
  - DatasetModal
  - DataLibraryCard
*/

class Marketplace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCategory: null,
      outCategory: null,
      sortedCategory: 'All',
      allDatasets: null,
      categoryIsChosen: false,
      categoriesNotSet: true,
      currentUser: null,
      currentUserDatasetsPurchased: [],
      currentSearchTerm: null,
      searchTermInput: false,
      clickedDataset: null,
    };
  }

  // display all datasets in db as catalog
  componentDidMount() {
    const callbackMount = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        const approvedDatasets = data.Items.filter((dataset) => dataset.properlySetUp && dataset.properlySetUp.BOOL === true);
        this.setState({ allDatasets: approvedDatasets });
      }
    };
    queryDatasetsMount(callbackMount);
    document.addEventListener('click', this.closeNav);

    // load in purchased datasets to state
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

  // initiate category sort
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

  // display all datasets in db as catalog
  mountDisplayDatasets = () => {
    if (!this.state.allDatasets || this.state.allDatasets.length === 0) {
      return null;
    }

    // for array
    const renderedDatasets = this.state.allDatasets.map((dataset) => {
      return ( // make a card for all datasets
        <DataLibraryCard
          onClick={() => this.setState({ clickedDataset: dataset })}
          dataset={dataset}
          currentUser={this.state.currentUser}
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

  searchBarOnChange = (e) => {
    this.setState({ currentSearchTerm: e.target.value });
  }

  // Enter search term
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

  renderDatasetsInCategory = () => {
    if (!this.state.inCategory) {
      return <LoadingScreen />;
    }
    // make cards for datasets in category by sort
    const approvedDatasets = this.state.inCategory.Items.filter((dataset) => dataset.properlySetUp && dataset.properlySetUp.BOOL === true);
    const renderedDatasets = approvedDatasets.map((dataset) => {
      if (dataset.category.S === this.state.sortedCategory) {
        return (
          <DataLibraryCard
            dataset={dataset}
            currentUser={this.state.currentUser}
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
    const approvedDatasets = this.state.outCategory.Items.filter((dataset) => dataset.properlySetUp && dataset.properlySetUp.BOOL === true);
    const renderedDatasets = approvedDatasets.map((dataset) => {
      if (dataset.category.S !== this.state.sortedCategory) {
        return (
          <DataLibraryCard
            onClick={() => this.setState({ clickedDataset: dataset })}
            dataset={dataset}
            currentUser={this.state.currentUser}
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
      </div>
    );
  };

  renderSearchBar = () => {
    return (
      <input type="text" id="searchbar" placeholder="dataset name" onKeyPress={this.handleKeyPress} onChange={(e) => this.searchBarOnChange(e)} />
    );
  }

  // Cards for subjects of search
  renderSearchTermDatasets = () => {
    const searchTerm = this.state.finalizedSearchTerm;
    let inCategory = [];
    if (this.state.sortedCategory !== 'All') { // only display within current category
      inCategory = this.state.allDatasets.filter((dataset) => dataset.category.S === this.state.sortedCategory);
    } else {
      inCategory = this.state.allDatasets;
    }
    const allMatchingDatasets = inCategory.reduce((finalDatasets, dataset) => { // filter on search term
      if (dataset.dataset_id.S.toLowerCase().includes(searchTerm.toLowerCase())) {
        finalDatasets.push(
          <DataLibraryCard
            onClick={() => this.setState({ clickedDataset: dataset })}
            dataset={dataset}
            currentUser={this.state.currentUser}
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
    if (!this.state.allDatasets || this.state.allDatasets.length === 0) {
      return 'No datasets found';
    }

    const allCategories = this.state.allDatasets.map((dataset) => {
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
    const alreadyPurchased = this.checkIfAlreadyPurchased(this.state.clickedDataset);

    return (
      <>
        <div className="body">
          <h1>Marketplace</h1>
          {this.renderUniqueCategories()}
          <br />
          {this.state.categoryIsChosen
            ? <div>{this.renderAllDatasets()}</div> // if category chosen render full category
            : (
              <div>{this.state.searchTermInput // otherwise render search terms
                ? this.renderSearchTermDatasets()
                : this.mountDisplayDatasets()}
              </div>
            )}
          {/* Modal pops up and displays dataset info when card is clicked */}
          <DatasetModal open={this.props.open} dataset={this.state.clickedDataset} currentUser={this.state.currentUser} alreadyPurchased={alreadyPurchased} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.datasetReducer.open,
  };
};

export default connect(mapStateToProps)(Marketplace);
