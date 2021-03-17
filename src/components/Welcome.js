/* eslint-disable func-names */
/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import '../style.scss';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { addRole } from '../store/reducers/role-reducer';
import DataCartoon from '../img/landingPage/DataCartoon.png';
import FlowChart from '../img/landingPage/Artificien-flowChart.png';

/*
Welcome component - first thing user sees on login
*/
class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  checkAuth() {
    Auth.currentSession()
      .then((data) => {
        this.props.addRole(0);
      }).catch(() => {
        console.log('caught');
      });
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
        <section id="hero" className="hero d-flex align-items-center">

          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center left-align-text">
                <h1 data-aos="fade-up">Distributed data, democratized.</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  The world&#39;s first federated learning marketplace, allowing data scientists to train models on
                  public application data without compromising user privacy.
                </h2>
                <div data-aos="fade-up" data-aos-delay="600">
                  {Number.parseInt(this.props.role, 10) === 2 && <button type="button" className="submit" onClick={() => this.props.history.push('/auth')}>Sign In</button>}
                </div>
              </div>
              <div className="col-lg-6" data-aos="zoom-out" data-aos-delay="200">
                <img src={DataCartoon} className="img-fluid" alt="" />
              </div>
            </div>
          </div>

        </section>

        <section id="about" className="about">

          <div className="container" data-aos="fade-up">
            <div className="row gx-0">

              <div className="col-lg-8 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                <img src={FlowChart} className="img-fluid" alt="" />
              </div>

              <div className="col-lg-4 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                <div className="content">
                  <h3>Our System</h3>
                  <h2>On-device training made easy.</h2>
                  <p>
                    App developers expose their app&#39;s data to Artificien through a few lines of Swift code.
                    Data scientists purchase access to this data and write standard Python models to train on it. Artificien handles the rest,
                    training the models locally on each user device. As the models iterate, scientists can monitor model
                    progress and loss, before finally downloading an updated model with aggregated training updates.
                  </p>
                </div>
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
