import '../style.scss';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ArtificienLogo from '../img/Artificien.png';

class BottomNav extends Component {
  // going to pull together all the kinds of things we want to display
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // W3 i used: https://www.w3schools.com/howto/howto_css_social_media_buttons.asp; but the way we do it causes an error!
  render() {
    return (
      <footer id="footer" className="footer">

        {/* <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 text-center">
                <h4>Our Newsletter</h4>
                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
              </div>
              <div className="col-lg-6">
                Blah Blah
              </div>
            </div>
          </div>
        </div> */}

        <div className="footer-top">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-5 col-md-12 footer-info">
                <a href="index.html" className="footer-logo d-flex align-items-center">
                  <img src={ArtificienLogo} alt="logo" />
                  {/* <img src="assets/img/logo.png" alt="" />
                  <span>FlexStart</span> */}
                </a>
                <p id="footer-paragraph">
                  The world&#39;s first federated learning marketplace, allowing data analysts to train models on
                  public application data without compromising user privacy.
                </p>
                <div className="social-links mt-3">
                  {/* Social links */}
                  {/* <a href="/" class="twitter"><i class="bi bi-twitter"></i></a>
                <a href="/" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="/" class="instagram"><i class="bi bi-instagram bx bxl-instagram"></i></a>
                <a href="/" class="linkedin"><i class="bi bi-linkedin bx bxl-linkedin"></i></a> */}
                </div>
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Quickstart</h4>
                <NavLink to="/user_guide"> User Guide </NavLink><br />
                <NavLink to="/tutorial"> Tutorial </NavLink><br />
                {/* <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/">About us</a></li>
                  <li><a href="/">Services</a></li>
                  <li><a href="/">Terms of service</a></li>
                  <li><a href="/">Privacy policy</a></li>
                </ul> */}
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Documentation</h4>
                <a href="https://github.com/dartmouth-cs98/20f-artificien" target="_blank" rel="noreferrer">Github</a><br />
                <NavLink to="/app_developer_documentation"> App Developer Docs </NavLink><br />
                <NavLink to="/data_scientist_documentation"> Data Scientist Docs </NavLink>
              </div>

              <div className="col-lg-3 col-md-12 footer-contact text-md-start">
                <h4>Contact Us</h4>
                <p>
                  Dartmouth College <br />
                  Hanover, NH<br />
                  United States <br />
                  <strong>Phone:</strong> +1 862 223 2923<br />
                  <strong>Email:</strong> help@artificien.com
                </p>

              </div>

            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default BottomNav;
