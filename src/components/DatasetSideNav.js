/* eslint-disable react/no-access-state-in-setstate */
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
      recentlyPurchased: [],
    };
  }

  purchaseDataset = async (datasetID, username, oldNumPurchased) => {
    this.setState({ alreadyPurchased: true });
    this.setState((state) => {
      state.recentlyPurchased.push(datasetID);
      return {
        ...state,
      };
    });
    const callback = (data, error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        this.setState({ alreadyPurchased: true });
        if (data.Items[0].datasets_purchased) { // if list exists, append to list
          const datasetsPurchased = data.Items[0].datasets_purchased.L;
          const datasetsPurchasedNew = [...datasetsPurchased];
          datasetsPurchasedNew.push({ S: datasetID });
          this.updateDatasetsPurchased(datasetsPurchasedNew, data.Items[0].user_id.S, datasetID, oldNumPurchased);
        } else { // if field doesn't exist (user hasn't purchased yet?), create a new list and add
          const newDatasetsPurchasedList = [{ S: datasetID }];
          this.updateDatasetsPurchased(newDatasetsPurchasedList, data.Items[0].user_id.S, datasetID, oldNumPurchased);
          this.props.alreadyPurchased = true;
          console.log(this.props.content.alreadyPurchased);
        }
      }
    };
    getUser(callback, username);
  }

  updateDatasetsPurchased = (newDatasetsList, userID, datasetID, oldNumPurchased) => {
    const newNumPurchased = String(Number.parseInt(oldNumPurchased, 10) + 1);
    const upParamsUser = {
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
    const upParamsDataset = {
      Key: {
        dataset_id: {
          S: datasetID,
        },
      },
      AttributeUpdates: {
        numPurchases: {
          Action: 'PUT',
          Value: {
            N: newNumPurchased,
          },
        },
      },
      ReturnValues: 'ALL_NEW',
      TableName: 'dataset_table',
    };
    updateItem(upParamsUser);
    updateItem(upParamsDataset);
  }

  // make a seperate render for the purchase button!
  renderPurchased = () => {
    if (this.props.alreadyPurchased || this.state.alreadyPurchased || (this.state.recentlyPurchased.includes(this.props.content.dataset_id.S))) {
      return (
        <div className="dataset_existing">You already own access to this dataset!</div>
      );
    } else {
      return (
        <button type="button"
          className="data-card-button"
          onClick={() => this.purchaseDataset(this.props.content.dataset_id.S, this.props.currentUser, this.props.content.numPurchases.N)}
        >Purchase This Dataset
        </button>
      );
    }
  }

  attributeList = (atrList) => {
    const attributeList = atrList.map((attribute) => {
      return <p>{attribute.S}</p>;
    });
    return attributeList;
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
            {this.props.content.attributes && <p>Attributes: {this.attributeList(this.props.content.attributes.L)}</p>}
            {this.props.content.appURL && <p>App URL: <a href={this.props.content.appURL.S} style={{ color: 'white' }}>{this.props.content.appURL.S}</a></p>}
            {this.renderPurchased()};
          </div>
          <div className="list-group" />
        </div>
      </div>
    );
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    if (this.props.style.width === 0 && this.state.alreadyPurchased) this.setState({ alreadyPurchased: false });
    return (
      <div>{this.props.content && <div>{this.renderDatasetCard()}</div>}</div>
    );
  }
}

export default DatasetSideNav;
