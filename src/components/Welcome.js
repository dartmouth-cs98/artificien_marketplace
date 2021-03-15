/* eslint-disable func-names */
/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import { connect } from 'react-redux';
import {
  getUser,
} from '../database/databaseCalls';
import { addRole } from '../store/reducers/role-reducer';
// import LoadingScreen from '../UtilityComponents/LoadingScreen';
// import HomepageAnimation from '../UtilityComponents/HomepageAnimation';
// import ErrorModal from '../UtilityComponents/Modal';
// import welcomePageStyles from '../styles/stylesDict';
// import AuthStateApp from './AuthStateApp';
import HeroImg from '../img/hero-img.png';
import AppScreenshot from '../img/LoginPage.png';

// welcome variable on homepage

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // faded: 0,
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }

  // sendKeyRequest = async (userID, accessID) => {
  //   const url = 'http://orche-pygri-1otammo0acarg-74b44bcdcc5f77f0.elb.us-east-1.amazonaws.com:5001/';
  //   const xhr = new XMLHttpRequest();
  //   const handleError = function (e) {
  //     console.log(e);
  //   };
  //   xhr.open('POST', url);
  //   xhr.setRequestHeader('Authorization', `${accessID}`);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.addEventListener('error', handleError);
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       console.log(xhr.status);
  //     } else {
  //       console.log('not done yet');
  //     }
  //   };
  //   const data = `{ user_id: ${userID} }`;
  //   xhr.send(data);
  //   console.log('sent');
  // }

  // updateHasOnboarded = (userID) => {
  //   const upParams = {
  //     Key: {
  //       user_id: {
  //         S: userID,
  //       },
  //     },
  //     AttributeUpdates: {
  //       has_onboarded: {
  //         Action: 'PUT',
  //         Value: {
  //           S: '1',
  //         },
  //       },
  //     },
  //     ReturnValues: 'ALL_OLD',
  //     TableName: 'user_table',
  //   };
  //   updateItem(upParams);
  // }

  checkAuth() {
    if (!this.state.isSignedIn) {
      console.log('auth');
      Auth.currentSession()
        .then((data) => {
          this.setState({ isSignedIn: true });
          const name = data.accessToken.payload.username;
          // const accessID = data.accessToken.jwtToken;
          // console.log(name);
          const callback = (successData, error) => { // requires current user to be in database
            if (error) {
              console.log(error);
            } else {
              console.log(successData);
              // if (Number.parseInt(successData.Items[0].has_onboarded.S, 10) === 0) {
              //   const userID = successData.Items[0].user_id.S;
              //   // this.sendKeyRequest(userID, accessID);
              //   // UPDATE has_onboarded in DB
              //   this.updateHasOnboarded(userID);
              // }
              if (this.props.role === 2 && successData.Items.length > 0) {
                this.props.addRole(successData.Items[0].role.S); // can't use ! here, 0 is falsey, add to initial state to redux store
                console.log('adding role');
              }
            }
          };
          getUser(callback, name);
        }).catch(() => {
          console.log('caught');
        });
    }
  }

  renderAuth = () => {
    return (
      <div style={{ display: 'flex', 'justify-content': 'center' }}>
        <button type="button" onClick={() => this.props.history.push('/auth')} id="signup-signin-button">Sign In or Create Account</button>
      </div>
    );
  }

  render() {
    return (
      <>
        {/* <div className="welcome-body" style={welcomePageStyles[this.state.faded]}>
          <h1>Distributed data, democratized.</h1>
          <p>
            <i>
              One single platform connects you to data from dozens of public applications through a secure, federated architecture.
              <br />
              Build, iterate, and access the exact datasets you need to generate insights.
            </i>
          </p>
        </div>
        {this.props.role === 2 && this.renderAuth()}
        <div style={{ 'margin-top': '100px' }}><HomepageAnimation /></div>
        <ErrorModal open={this.props.open} /> */}
        <section id="hero" className="hero d-flex align-items-center">

          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center left-align-text">
                <h1 data-aos="fade-up">Distributed data, democratized</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  The world&#39;s first federated learning marketplace, allowing data analysts to train models on
                  public application data without compromising user privacy.
                </h2>
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="text-center text-lg-start">
                    <a href="#about" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right" />
                    </a>
                  </div>
                  {this.props.role === 2 && this.renderAuth()}
                </div>
              </div>
              <div className="col-lg-6" data-aos="zoom-out" data-aos-delay="200">
                {/* <HomepageAnimation /> */}
                <img src={HeroImg} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

        </section>

        <section id="about" className="about">

          <div className="container" data-aos="fade-up">
            <div className="row gx-0">

              <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                <div className="content">
                  <h3>Who We Are</h3>
                  <h2>Expedita voluptas omnis cupiditate totam eveniet nobis sint iste. Dolores est repellat corrupti reprehenderit.</h2>
                  <p>
                    Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et et dolor consequatur
                    itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et est corrupti.
                  </p>
                  <div className="text-center text-lg-start">
                    <a href="/" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Read More</span>
                      <i className="bi bi-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                <img src={AppScreenshot} className="img-fluid" alt="" />
              </div>

            </div>
          </div>

        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.roleReducer.role,
    open: state.modalReducer.open,
  };
};

export default connect(mapStateToProps, { addRole })(Welcome);
