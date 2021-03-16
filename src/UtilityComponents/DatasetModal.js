import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, updateItem } from '../database/databaseCalls';
import { openDatasetModal } from '../store/reducers/dataset-reducer';

// const { URL } = require('url');

class DatasetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyPurchased: false,
      haveNotQueried: true,
      recentlyPurchased: [],
    };
  }

  purchaseDataset = async (datasetID, username, oldNumPurchases) => {
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
          this.updateDatasetsPurchased(datasetsPurchasedNew, data.Items[0].user_id.S, datasetID, oldNumPurchases);
        } else { // if field doesn't exist (user hasn't purchased yet?), create a new list and add
          const newDatasetsPurchasedList = [{ S: datasetID }];
          this.updateDatasetsPurchased(newDatasetsPurchasedList, data.Items[0].user_id.S, datasetID, oldNumPurchases);
          this.props.alreadyPurchased = true;
          console.log(this.props.content.alreadyPurchased);
        }
      }
    };
    getUser(callback, username);
  }

  updateDatasetsPurchased = (newDatasetsList, userID, datasetID, oldNumPurchases) => {
    const newNumPurchases = String(Number.parseInt(oldNumPurchases, 10) + 1);
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
            N: newNumPurchases,
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
    if (this.state.recentlyPurchased.includes(this.props.dataset.dataset_id.S)) {
      return (
        <div className="dataset_existing">Congratulations!
          Visit <Link onClick={() => this.props.openDatasetModal(false)} className="dataset_navlink" to="/models"><strong><u>models</u></strong></Link> to upload a model to train on this data.
          <br />
        </div>
      );
    } else if (this.props.alreadyPurchased || this.state.alreadyPurchased) {
      return (
        <div style={{ color: 'black', 'margin-bottom': '10px' }}>You already own access to this dataset!</div>
      );
    } else {
      return (
        <button type="button"
          className="data-card-button"
          onClick={() => this.purchaseDataset(this.props.dataset.dataset_id.S, this.props.currentUser, this.props.dataset.numPurchases.N)}
        >Purchase This Dataset
        </button>
      );
    }
  }

  attributeList = (atrList, atrTypes, atrDescriptions) => {
    const attributeList = [];
    for (let i = 0; i < atrTypes.length; i += 1) {
      const attrName = atrList[i].S;
      const attrType = atrTypes[i].S;
      const attrDes = atrDescriptions[i].S;
      if (attrType === 'S') {
        attributeList.push(
          <div style={{ display: 'flex', 'justify-content': 'space-evenly', 'margin-top': '5px' }}>
            <p style={{ width: '15%' }}><strong>{attrName}</strong></p>
            <p style={{ width: '15%' }}>String</p>
            <p style={{ width: '40%' }}>{attrDes}</p>
          </div>,
        );
      } else if (attrType === 'N') {
        attributeList.push(
          <div style={{ display: 'flex', 'justify-content': 'space-evenly', 'margin-top': '5px' }}>
            <p style={{ width: '15%' }}><strong>{attrName}</strong></p>
            <p style={{ width: '15%' }}>Float</p>
            <p style={{ width: '40%' }}>{attrDes}</p>
          </div>,
        );
      }
    }
    return attributeList;
  }

  render() {
    if (this.props.dataset) console.log(this.props.dataset.dataset_id);
    let op;
    if (this.props.open === undefined) op = false;
    else op = this.props.open;

    const handleClose = () => {
      this.props.openDatasetModal(false);
      this.setState({ alreadyPurchased: false });
    };

    const bodyStyles = {
      'background-color': 'rgb(238, 238, 238)',
      width: '50%',
      height: '50%',
      border: '10px solid rgb(105, 000, 100)',
      'border-radius': '10px',
      position: 'absolute',
      'overflow-y': 'auto',
    };

    const body = (
      <div style={bodyStyles}>
        {this.props.dataset
        && (
        <>
          <h2 id="simple-modal-title">{this.props.dataset.dataset_id.S}</h2>
          <div style={{ display: 'flex', 'justify-content': 'center' }}>
            <div className="artificien-modal" active />
          </div>
          <div className="app-modal-description">
            {this.renderPurchased()}
            {this.props.dataset.num_devices && <p><strong>Number of users:</strong> {this.props.dataset.num_devices.N}</p>}
            {this.props.dataset.numPurchases && <p><strong>Number of purchases:</strong> {this.props.dataset.numPurchases.N}</p>}
            {this.props.dataset.category && <p><strong>Category:</strong> {this.props.dataset.category.S}</p>}
          </div>
          <div className="app-modal-attributes">
            {this.props.dataset.attributeTypes
            && (
            <><br />
              <p><strong>Attributes:</strong>
                {this.attributeList(this.props.dataset.attributes.L, this.props.dataset.attributeTypes.L, this.props.dataset.attributeDescriptions.L)}
              </p>
            </>
            )}
          </div>
        </>
        )}
      </div>
    );
    return (
      <div>
        <Modal
          open={op} // this.props.open maybe make this props-based. When we redirect, swap a global "isModal" redux var to 1. pass that into here, as this.props.open
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ display: 'flex', 'justify-content': 'center', 'align-items': 'center' }}
        >
          {body}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.datasetReducer.open,
  };
};

export default connect(mapStateToProps, { openDatasetModal })(DatasetModal);
