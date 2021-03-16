import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.scss';
import { openDatasetModal } from '../store/reducers/dataset-reducer';

/*
Simple component that displays card-level details for each dataset available
*/
class DataLibraryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <>
        <div className="data-card" key={Math.random()} style={{ width: '22rem' }}>
          <div className="data-card-body">
            {this.props.dataset.dataset_id && <h1>{this.props.dataset.dataset_id.S}</h1>}
            <p>Category: {this.props.dataset.category.S}</p>
            <button type="button"
              className="data-card-button"
              tabIndex={0}
              onClick={() => {
                this.props.openDatasetModal(true);
                this.props.onClick();
              }}
            >Learn More
            </button>
          </div>
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

export default connect(mapStateToProps, { openDatasetModal })(DataLibraryCard);
