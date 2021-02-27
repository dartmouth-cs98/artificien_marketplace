import React, { Component } from 'react';
import '../style.scss';
import Matt from '../img/MK_Headshot.jpg';
import Jake from '../img/JE_Headshot.jpg';
import Toby from '../img/TL_Headshot.jpg';
import Quill from '../img/AQ_Headshot.jpg';
import Shreyas from '../img/SA_Headshot.jpg';

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
          <img src={Matt} alt="matt" height="200" />
          <h3>Matt Kenney</h3>
          <h4><i>Role</i></h4>
          <p>I am a senior double majoring in Computer Science and Neuroscience at Dartmouth College. I have experience interning as both a Product Manager and Software Engineer
            at large tech companies. I also co-founded a coffee company with Jake Epstein.
          </p>
          <img src={Jake} alt="jake" height="200" />
          <h3>Jake Epstein</h3>
          <h4><i>Role</i></h4>
          <p>I am a senior double-majoring in Computer Science and Engineering modified by Economics (Operations Research) at Dartmouth College.
            I have experience interning as a Product Manager at large technology companies, working at early stage start-ups, and as an entrepreneur.
          </p>
          <p>In my free time, I’m on the Entrepreneurship Center’s Student Leadership Board and am the Co-President of the Dartmouth Investment and Philanthropy Program,
            a half million dollar student managed equity fund. I was also a national champion on Dartmouth’s fencing team in 2018.
          </p>
          <img src={Quill} alt="alex" height="150" />
          <h3>Alex Quill</h3>
          <h4><i>Role</i></h4>
          <p>I am a senior double majoring in Computer Science and Cognitive Science at Dartmouth College. I have experience interning in both strategy and management consulting roles.</p>
          <img src={Toby} alt="toby" height="150" />
          <h3>Tobias Lange</h3>
          <h4><i>Role</i></h4>
          <p>I am a senior double majoring in Computer Science and Economics at Dartmouth College. I have experience interning in strategy consulting and technology growth equity.</p>
          <img src={Shreyas} alt="shreyas" height="150" />
          <h3>Shreyas Agnihtori</h3>
          <h4><i>Role</i></h4>
          <p>I am a senior majoring in Computer Science at Dartmouth College. I have experieincing interning as a Software Engineer and management consultant.</p>
        </div>
      </>
    );
  }
}

export default AboutUs;
