import '../style.scss';
import React, { Component } from 'react';

class BottomNav extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="bottom-nav-container">
        <div id="bottom-nav-column">Column 1
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
        </div>
        <div id="bottom-nav-column">Column 2
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
        </div>
        <div id="bottom-nav-column">Column 3
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
        </div>
        <div id="bottom-nav-column">Column 4
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
          <p>Link</p>
        </div>
      </div>
    );
  }
}

export default BottomNav;
