import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { openModal } from '../store/reducers/modal-reducer';

/*
Error Modal
- Pops up when a restricted route is reached
*/

class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let op;
    if (this.props.open === undefined) op = false;
    else op = this.props.open;

    const handleClose = () => {
      this.props.openModal(false);
    };

    const bodyStyles = {
      'background-color': 'rgb(238, 238, 238)',
      width: 400,
      border: '10px solid #eed202',
      'border-radius': '10px',
      position: 'absolute',
    };

    const body = (
      <div style={bodyStyles}>
        <h2 id="simple-modal-title">Unauthorized Route!</h2>
        <div style={{ display: 'flex', 'justify-content': 'center' }}><div className="caution" active /></div>
        <p id="simple-modal-description">
          You aren&apos;t allowed to visit that page - try switching modes!
        </p>
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
    open: state.modalReducer.open,
  };
};

export default connect(mapStateToProps, { openModal })(ErrorModal);
