import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../style.scss';
import { getUser, updateItem } from '../database/databaseCalls';

/*
Right-side slide-out component that displays more in-depth information about dataset.
Rendered when user clicks on dataLibraryCard component
*/

class DatasetSideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyPurchased: this.props.alreadyPurchased,
    };
  }

  purchaseDataset = async (datasetID, username) => {
    this.setState({ alreadyPurchased: true });
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ alreadyPurchased: true });
        if (data.Items[0].datasets_purchased) { // if list exists, append to list
          const datasetsPurchased = data.Items[0].datasets_purchased.L;
          console.log(datasetsPurchased);
          const datasetsPurchasedNew = [...datasetsPurchased];
          datasetsPurchasedNew.push({ S: datasetID });
          this.updateDatasetsPurchased(datasetsPurchasedNew, data.Items[0].user_id.S);
        } else { // if field doesn't exist (user hasn't purchased yet?), create a new list and add
          const newDatasetsPurchasedList = [{ S: datasetID }];
          this.updateDatasetsPurchased(newDatasetsPurchasedList, data.Items[0].user_id.S);
          this.props.alreadyPurchased = true;
          console.log(this.props.content.alreadyPurchased);
        }
      }
    };
    getUser(callback, username);
  }

  updateDatasetsPurchased = (newDatasetsList, userID) => {
    const upParams = {
      Key: {
        user_id: {
          S: userID,
        },
      },
      AttributeUpdates: {
        datasets_purchased: {
          Action: 'PUT',
          Value: {
            L: newDatasetsList,
          },
        },
      },
      ReturnValues: 'ALL_NEW',
      TableName: 'user_table',
    };
    updateItem(upParams);
  }

  // make a seperate render for the purchase button!
  renderPurchased = () => {
    if (this.props.alreadyPurchased || this.state.alreadyPurchased) {
      return (
        <div className="dataset_existing">You already own access to this dataset!</div>
      );
    } else {
      return (
        <button type="button"
          className="data-card-button"
          onClick={() => this.purchaseDataset(this.props.content.dataset_id.S, this.props.currentUser)}
        >Purchase This Dataset
        </button>
      );
    }
  }

  renderDatasetCard = () => {
    // if we have predictable attributes for the card...
    return (
      <div className="overlay" style={this.props.style}>
        <button type="button" className="data-card-button" onClick={this.props.onClick}>x</button>
        <div className="sidenav-container">
          <div className="text-center">
            <h2>{this.props.content.app.S}</h2>
            <p>Category: {this.props.content.category.S}</p>
            {this.props.content.predictable_attributes && <p>Predictable Attributes: {this.props.content.predictable_attributes.S}</p>}
            {this.renderPurchased()};
          </div>
          <div className="list-group" />
        </div>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    console.log('====');
    console.log(this.props.alreadyPurchased);
    console.log('====');
    console.log(this.state.alreadyPurchased);
    console.log('====');
    if (this.props.style.width === 0 && this.state.alreadyPurchased) this.setState({ alreadyPurchased: false });
    return (
      <div>{this.props.content && <div>{this.renderDatasetCard()}</div>}</div>
    );
  }
}

export default DatasetSideNav;
