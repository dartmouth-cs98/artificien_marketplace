/* eslint-disable no-unused-expressions */
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
      changed: false,
    };
  }

  purchaseDataset = async (datasetID, username) => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        console.log(this.state.changed);
        this.setState({ changed: true });
        if (data.Items[0].datasets_purchased) { // if list exists, append to list
          const datasetsPurchased = data.Items[0].datasets_purchased.L;
          const datasetsPurchasedNew = [...datasetsPurchased];
          datasetsPurchasedNew.push({ S: datasetID });
          this.updateDatasetsPurchased(datasetsPurchasedNew, data.Items[0].user_id.S);
        } else { // if field doesn't exist (user hasn't purchased yet?), create a new list and add
          const newDatasetsPurchasedList = [{ S: datasetID }];
          this.updateDatasetsPurchased(newDatasetsPurchasedList, data.Items[0].user_id.S);
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
    console.log(!this.state.changed);
    console.log(!this.props.alreadyPurchased);
    if (!this.props.alreadyPurchased || !this.state.changed) {
      console.log('hello');
      return (
        <button type="button"
          className="data-card-button"
          onClick={() => this.purchaseDataset(this.props.content.dataset_id.S, this.props.currentUser)}
        >
          Purchase This Dataset
        </button>
      );
    } else {
      console.log('nothankyou');
      return (
        <div className="dataset_existing">You already own access to this dataset!</div>
      );
    }
  }

  renderDatasetCard = () => {
    // if we have predictable attributes for the card...
    return (
      <div className="overlay" style={this.props.style}>
        <button type="button" className="data-card-button" onClick={() => { this.props.onClick; this.setState({ changed: false }); }}>x</button>
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
    return (
      <div>{this.props.content && <div>{this.renderDatasetCard()}</div>}</div>
    );
  }
}

export default DatasetSideNav;
