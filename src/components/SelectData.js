// import React, { Component } from 'react';
import React from 'react';

// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';

// class SelectData extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <div>
//         <h1>Select Data Page</h1>
//         <p>To be filled in later</p>
//         <Link to='/data_library'>
//           <button type='button'>
//             Go to Data Library
//           </button>
//         </Link>
//       </div>
//     );
//   }
// }

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
      },
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeNav);
  }

  openNav() {
    this.setState({ style: { width: 350 } });
    console.log('bingus');
    // document.body.style.backgroundColor = 'rgba(0,0,0,0.2)';
    // document.addEventListener('click', this.closeNav);
  }

  closeNav() {
    document.removeEventListener('click', this.closeNav);
    console.log('bongo');
    const style = { width: 0 };
    this.setState({ style });
    document.body.style.backgroundColor = '#F3F3F3';
  }

  render() {
    return (
      <div>
        <h2>Fullscreen Overlay Nav Example</h2>
        <p>Click on the element below to open the fullscreen overlay navigation menu.</p>
        <p>In this example, the navigation menu will slide in, from right to left:</p>
        <span role="button" className="openbtn" tabIndex={0} style={{ fontSize: 30 }} onClick={this.openNav}> open</span>
        <div className="overlay" style={this.state.style}>
          <div className="sidenav-container">
            <button type="button" className="closebtn" onClick={this.closeNav}>x</button>
            <div className="text-center">
              <h2>Form</h2>
              <p>This is a sample input form</p>
            </div>
            <div className="list-group">
              {/* your form component goes here */}
              {this.props.children}
            </div>
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js" />
      </div>
    );
  }
}

export default Test;
