import React, { Component } from 'react';
import '../style.scss';

/*
UPDATE - decided not to share this yet, we don't have anything to show here lol
*/

class Careers extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // -------------------------------------------------------- RENDER -------------------------------------------------------- //
  render() {
    return (
      <>
        <div className="body">
          <h1>Careers</h1>
          <p>No jobs...yet ;)</p>
        </div>
      </>
    );
  }
}

export default Careers;
