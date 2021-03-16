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
                <p id="footer-paragraph">Cras fermentum odio eu feugiat lide par naso tierra.
                  Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.
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
                <h4>Useful Links</h4>
                <a href="/">Home</a><br />
                <NavLink to="/upload_data"> Upload Data </NavLink><br />
                <a href="/">About us</a>
                {/* <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/">About us</a></li>
                  <li><a href="/">Services</a></li>
                  <li><a href="/">Terms of service</a></li>
                  <li><a href="/">Privacy policy</a></li>
                </ul> */}
              </div>

              <div className="col-lg-2 col-6 footer-links">
                <h4>Our Services</h4>
                <a href="/">Home</a><br />
                <NavLink to="/upload_data"> Upload Data </NavLink><br />
                <a href="/">About us</a>
              </div>

              <div className="col-lg-3 col-md-12 footer-contact text-md-start">
                <h4>Contact Us</h4>
                <p>
                  A108 Adam Street <br />
                  New York, NY 535022<br />
                  United States <br />
                  <strong>Phone:</strong> +1 5589 55488 55<br />
                  <strong>Email:</strong> info@example.com<br />
                </p>

              </div>

            </div>
          </div>
        </div>
      </footer>
    // <div className="bottom-nav-container">
    //   <div id="bottom-nav-column">Company
    //     <p><NavLink ClassName="active" to="/about_us"> About Us </NavLink></p>
    //     <p><NavLink to="/careers"> Careers </NavLink></p>
    //     <p><NavLink to="/press"> Press </NavLink></p>
    //   </div>
    //   <div id="bottom-nav-column">Products
    //     <p><NavLink ClassName="active" to="/marketplace"> Marketplace </NavLink></p>
    //     <p><NavLink to="/models"> My Models </NavLink></p>
    //     <p><NavLink to="/upload_data"> Data Upload </NavLink></p>
    //     <p><NavLink to="/how_it_works"> How It Works </NavLink></p>
    //   </div>
    //   <div id="bottom-nav-column">Help
    //     <p><NavLink to="/documentation"> Documentation </NavLink></p>
    //     <p><a href="https://artificien.zendesk.com/hc/en-us">Support Desk</a></p>
    //   </div>
    //   <div id="bottom-nav-column">Contact
    //     <p />
    //     <p> <a href="https://www.linkedin.com/in/tobias-lange/" className="fa fa-linkedin">li</a> <br /></p>
    //     <p> <a href="https://www.facebook.com/tobias.lange.5494/" className="fa fa-facebook">f</a></p>
    //   </div>
    // </div>
    );
  }
}

export default BottomNav;
