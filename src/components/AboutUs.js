/* eslint-disable global-require */
import React, { Component } from 'react';
import '../style.scss';

/*
Simple component that links to user-specific jupyterhub instance
*/

class AboutUs extends Component {
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
          <h1>Vision</h1>
          <p>Artificien is the first of its kind marketplace that sells access to data, rather than data itself, and facilitates federated learning,
            a revolutionary technology paradigm where ML models are trained on-device, and data never has to leave the device.
            We offer a platform where enterprises can purchase access to previously unaccessible user data from app developers, and Artificien organizes the Federated Learning process on the backend.
          </p>
          <h1>Team</h1>
          <img src={require('../img/MK_headshot.jpg')} alt="matt" height="200" />
          <h3>Matt Kenney</h3>
          <h4><i>Infra Man</i></h4>
          <p>text about mr. matt</p>
          <img src={require('../img/JE_headshot.jpg')} alt="jake" height="200" />
          <h3>Jake Epstein</h3>
          <h4><i>Jupyta Man</i></h4>
          <p>I am a senior double-majoring in Computer Science and Engineering modified by Economics (Operations Research) at Dartmouth College.
            I have experience interning as a Product Manager at large technology companies, working at early stage start-ups, and as an entrepreneur.
          </p>
          <p>In my free time, I’m on the Entrepreneurship Center’s Student Leadership Board and am the Co-President of the Dartmouth Investment and Philanthropy Program,
            a half million dollar student managed equity fund. I was also a national champion on Dartmouth’s fencing team in 2018.
          </p>
          <img src={require('../img/AQ_headshot.jpg')} alt="alex" height="150" />
          <h3>Alex Quill</h3>
          <h4><i>Beast Man</i></h4>
          <p>text about mr. quill</p>
          <img src={require('../img/TL_headshot.jpg')} alt="toby" height="150" />
          <h3>Tobias Lange</h3>
          <h4><i>frontend Man</i></h4>
          <p>text about mr. bobe</p>
          <img src={require('../img/SA_headshot.jpg')} alt="shreyas" height="150" />
          <h3>Shreyas Agnihtori</h3>
          <h4><i>iOS Man</i></h4>
          <p>text about mr. shrey</p>
        </div>
      </>
    );
  }
}

export default AboutUs;
