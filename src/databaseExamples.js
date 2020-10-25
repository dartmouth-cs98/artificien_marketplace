const AWS = require('aws-sdk/dist/aws-sdk-react-native');

console.log('HELLO');

// -------------------------- Imports -----------------------------

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIA2PA6YNEMESO7RV7A',
  secretAccessKey: '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',
});

const docClient = new AWS.DynamoDB();

// -------------------------- SCAN Params -----------------------------

const scanParams = {
  TableName: 'hello_world_table', // give it your table name
};

// -------------------------- CRUD Params -----------------------------

const getParams = {
  Key: {
    user_id: {
      S: 'kenneym',
    },
  },
  TableName: 'hello_world_table',
};

const putParams = {
  Item: {
    user_id: {
      S: 'bigChungus',
    },
    Name: {
      S: 'Tobias Weebington',
    },
    Skills: {
      M: { // object type
        Swag: {
          N: '100',
        },
        Genius: {
          S: 'No',
        },
      },
    },
  },
  ReturnConsumedCapacity: 'TOTAL',
  TableName: 'hello_world_table',
};

const upParams = {
  Key: {
    user_id: {
      S: 'bigChungus',
    },
  },
  AttributeUpdates: {
    Name: {
      Action: 'PUT',
      Value: {
        S: 'JEFFERY EPSTEIN',
      },
    },
  },
  ReturnValues: 'ALL_OLD',
  TableName: 'hello_world_table',
};

const delParams = {
  Key: {
    user_id: {
      S: 'bigChungus',
    },
  },
  ReturnValues: 'ALL_OLD',
  TableName: 'hello_world_table',
};

// -------------------------- DB FUNCTIONS -----------------------------

docClient.scan(scanParams, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log('\n--------SCAN--------');
    console.log(JSON.stringify(data, null, 2));
  }
});

docClient.getItem(getParams, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log('--------GET-------');
    console.log(JSON.stringify(data.Item, null, 2));
    // document.getElementById('dbinfo').innerHTML = 'big chungus'
  }
});

docClient.putItem(putParams, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log('--------PUT-------');
    console.log(JSON.stringify(data, null, 2));
  }
});

docClient.updateItem(upParams, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log('--------UPDATE-------');
    console.log(JSON.stringify(data, null, 2));
  }
});

docClient.deleteItem(delParams, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log('--------DEL-------');
    console.log(JSON.stringify(data, null, 2));
  }
});

// ------------------Old Constructor --------------------
// const path = require('path');

// const dirPath = path.join(__dirname, '../config.json');

// AWS.config.loadFromPath(dirPath);
// const DOC = require('dynamodb-doc');
