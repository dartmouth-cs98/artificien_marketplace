import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { openAppModal } from '../store/reducers/app-reducer';

// const { URL } = require('url');

class AppModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  attributeList = (atrList, atrTypes) => {
    // const attributeList = atrList.map((attribute) => {
    //   return <p>{attribute.S}</p>;
    // //   } else if (attribute.N) {
    // //     return <p>{attribute.N} Number</p>;
    // //   } else if (attribute.B) {
    // //     return <p>{attribute.B} Binary</p>;
    // //   } else {
    // //     return <p>None/??</p>;
    // //   }
    // });
    const attributeList = [];
    for (let i = 0; i < atrTypes.length; i += 1) {
      const attrName = atrList[i].S;
      const attrType = atrTypes[i].S;
      if (attrType === 'S') attributeList.push(<p style={{ 'background-color': 'green', 'border-radius': '12px' }}>{attrName}       String</p>);
      else if (attrType === 'N') attributeList.push(<p style={{ 'background-color': 'rgb(158, 236, 247)', 'border-radius': '12px' }}>{attrName}        Number</p>);
    }
    return attributeList;
  }

  render() {
    let op;
    if (this.props.open === undefined) op = false;
    else op = this.props.open;

    console.log('in modal');
    console.log(this.props.dataset);

    const handleClose = () => {
      this.props.openAppModal(false);
    };

    const bodyStyles = {
      'background-color': 'rgb(238, 238, 238)',
      width: '50%',
      height: '50%',
      border: '10px solid rgb(105, 000, 100)',
      'border-radius': '10px',
      position: 'absolute',
    };

    const body = (
      <div style={bodyStyles}>
        {this.props.dataset
        && (
        <>
          <h2 id="simple-modal-title">{this.props.dataset.dataset_id.S}</h2>
          <div style={{ display: 'flex', 'justify-content': 'center' }}>
            {/* <div style={{ 'backgroud-image': new URL(this.props.dataset.logo_image_url.S) }} active /> */}
            <div className="artificien-modal" active />
          </div>
          <div className="app-modal-description">
            {this.props.dataset.num_devices && <p>Number of users: {this.props.dataset.num_devices.N}</p>}
            {this.props.dataset.numPurchases && <p>Number of purchases: {this.props.dataset.numPurchases.N}</p>}
            {this.props.dataset.category && <p>Category: {this.props.dataset.category.S}</p>}
            {this.props.dataset.attributeTypes && <p>Attributes: {this.attributeList(this.props.dataset.attributes.L, this.props.dataset.attributeTypes.L)}</p>}
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
    open: state.appReducer.open,
  };
};

export default connect(mapStateToProps, { openAppModal })(AppModal);
