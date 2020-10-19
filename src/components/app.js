import '../style.scss';
import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import Counter from '../containers/counter';
import Controls from '../containers/controls';


const Welcome = (props) => {
  return (
    <div>
      Welcome
      <Button>Tobias is a Weeb</Button>
      <Counter />
      <Controls />
    </div>
  );
};
const About = (props) => {
  return <div> All there is to know about me </div>;
};
const Test = (props) => {
  return <div> ID: {props.match.params.id} </div>;
};
const FallBack = (props) => {
  return <div> URL Not Found </div>;
};


const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route exact path="/test/:id" component={Test} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact> Home </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
        <li>
          <NavLink to="/test/id1"> test id1 </NavLink>
        </li>
        <li>
          <NavLink to="/test/id2"> test id2 </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default App;

// ReactDOM.render(<App />, document.getElementById('main'));

// -------------------------- Imports -----------------------------
var AWS = require('aws-sdk');

const path = require('path')
const dirPath = path.join(__dirname, '../../config.JSON')
AWS.config.loadFromPath(dirPath);

var DOC = require("dynamodb-doc");
docClient = new DOC.DynamoDB();


// -------------------------- SCAN Params -----------------------------


var scanParams = {
  TableName: "hello_world_table" // give it your table name 
};

// -------------------------- CRUD Params -----------------------------

// var getParams = {
//   Key: {
//     "user_id": "kenneym"
//   },
//   TableName: "hello_world_table"
// };

// var putParams = {
//   Item: {
//     "user_id": "bigChungus",
//     "Name": "Tobias Weebington",
//     "Skills": {
//       "Swag": 50,
//       "Genius": "No"
//     }
//   },
//   ReturnConsumedCapacity: "TOTAL",
//   TableName: "hello_world_table"
// };

// var upParams = {
//   Key: {
//     "user_id": "bigChungus",
//   },
//   AttributeUpdates: {
//     'Name': {
//       Action: "PUT",
//       Value: "JEFFERY EPSTEIN"
//     }
//   },
//   ReturnValues: "ALL_OLD",
//   ReturnValues: "ALL_NEW",
//   TableName: "hello_world_table"
// };

// var delParams = {
//   Key: {
//     "user_id": "bigChungus"
//   },
//   ReturnValues: "ALL_OLD",
//   TableName: "hello_world_table"
// }

// -------------------------- DB FUNCTIONS -----------------------------


docClient.scan(scanParams, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log("\n--------SCAN--------");
    console.log(JSON.stringify(data, null, 2));
  }
});

// docClient.getItem(getParams, function (err, data) {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log("--------GET-------")
//         console.log(JSON.stringify(data.Item, null, 2));
//         // document.getElementById("dbinfo").innerHTML = "big chungus"
//     }
// });

// docClient.putItem(putParams, function (err, data) {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log("--------PUT-------")
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// docClient.updateItem(upParams, function (err, data) {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log("--------UPDATE-------")
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// docClient.deleteItem(delParams, function (err, data) {
//     if (err) {
//         console.log(err, err.stack);
//     } else {
//         console.log("--------DEL-------")
//         console.log(JSON.stringify(data, null, 2));
//     }
// });