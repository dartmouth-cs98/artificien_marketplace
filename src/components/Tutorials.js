import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

class Tutorials extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderSlides = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <span>Install cocoapod</span>
          </div>
          <div className="each-slide">
            <span>Do some more stuff</span>
          </div>
          <div className="each-slide">
            <span>Slide 3</span>
          </div>
        </Slide>
      </div>
    );
  }
  // -------------------------------------------------------- RENDER -------------------------------------------------------- //

  render() {
    return (
      <div>
        <h1>Upload Your Data</h1>
        <div>
          {this.renderSlides()};
        </div>
      </div>
    );
  }
}

export default Tutorials;
