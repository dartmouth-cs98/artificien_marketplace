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
    };
  }

  purchaseDataset = async (datasetID, username) => {
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
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

  renderDatasetCard = () => {
    console.log(this.props.content.dataset_id.S);
    console.log(this.props.alreadyPurchased);
    // if we have predictable attributes for the card...
    return (
      <div className="overlay" style={this.props.style}>
        <button type="button" className="closebtn" onClick={this.props.onClick}>x</button>
        <div className="sidenav-container">
          <div className="text-center">
            <h2>{this.props.content.dataset_id.S}</h2>
            <p>Pulled From: {this.props.content.app.S}</p>
            <p>Category: {this.props.content.category.S}</p>
            {this.props.content.predictable_attributes && <p>Predictable Attributes: {this.props.content.predictable_attributes.S}</p>}
            {!this.props.alreadyPurchased ? (
              <button type="button"
                className="data-card-button"
                onClick={() => this.purchaseDataset(this.props.content.dataset_id.S, this.props.currentUser)}
              >Purchase This Dataset
              </button>
            ) : <div> You already own access to this dataset! </div>}
          </div>
          <div className="list-group" />
        </div>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    if (!this.props.content) {
      // placeholder div for initial hidden sidebar
      return (
        <div className="overlay" style={this.props.style}>
          <h3>Oops!</h3>
        </div>
      );
    } else {
      return (
        <div>{this.renderDatasetCard()}</div>
      );
    }
  }
}

export default DatasetSideNav;
