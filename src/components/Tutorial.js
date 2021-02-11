import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../style.scss';

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideImages: [
        'Artificien.png',
        'Artificien.png',
        'Artificien.png',
      ],
    };
  }

  renderSlides = () => {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${this.state.slideImages[0]})` }}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${this.state.slideImages[1]})` }}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${this.state.slideImages[2]})` }}>
              <span>Slide 3</span>
            </div>
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
        {this.renderSlides()};
      </div>
    );
  }
}

export default Tutorial;
