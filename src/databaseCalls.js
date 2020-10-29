const AWS = require('aws-sdk/dist/aws-sdk-react-native');

// -------------------------- Imports -----------------------------

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIA2PA6YNEMESO7RV7A',
  secretAccessKey: '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',
});

export const docClient = new AWS.DynamoDB();

// --------------------------CRUD Operations------------------------

// ---------------------------Wrapper-----------------------------
// export async function makeDbRequest(operation, tableName, PK, attributes = null) {
//   if (operation === 'PUT') {
//     const resp = await putResponse(tableName, PK, attributes).then((data) => {
//       console.log(data);
//       return data;
//     }).catch((error) => {
//       console.log(error, error.stack);
//     });
//     return resp;
//   } else { // Update?
//     return null;
//   }
// }

// ----------------------------------- SCAN -------------------------------------
export function scanUsers(callback) {
  docClient.scan({ TableName: 'user_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}
export function scanModels(callback) {
  docClient.scan({ TableName: 'model_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}
export function scanApps(callback) {
  docClient.scan({ TableName: 'app_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}
export function scanEnterprises(callback) {
  docClient.scan({ TableName: 'enterprise_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}
export function scanDatasets(callback) {
  docClient.scan({ TableName: 'dataset_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}

// --------------------------GET--------------------

export function getEnterprise(callback, PK) {
  const getParams = {
    Key: { enterprise_id: { S: PK } },
    TableName: 'enterprise_table',
  };
  docClient.getItem(getParams, (err, data) => { // send and receieve
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}

export function getUser(callback, PK) {
  const getParams = {
    Key: { user_id: { S: PK } },
    TableName: 'user_table',
  };
  docClient.getItem(getParams, (err, data) => { // send and receieve
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

export function getApp(callback, PK) {
  const getParams = {
    Key: { app_id: { S: PK } },
    TableName: 'app_table',
  };
  docClient.getItem(getParams, (err, data) => { // send and receieve
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

export function getDataset(callback, PK) {
  const getParams = {
    Key: { dataset_id: { S: PK } },
    TableName: 'dataset_table',
  };
  docClient.getItem(getParams, (err, data) => { // send and receieve
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

export function getModel(callback, PK) {
  const getParams = {
    Key: { model_id: { S: PK } },
    TableName: 'model_table',
  };
  docClient.getItem(getParams, (err, data) => { // send and receieve
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

// ----------------------------DEL---------------------------------
export function delEnterprise(callback, PK) {
  const delParams = {
    Key: { enterprise: { S: PK } },
    TableName: 'enterprise',
  };
  docClient.deleteItem(delParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

export function delUser(callback, PK) {
  const delParams = {
    Key: { user_id: { S: PK } },
    TableName: 'user_table',
  };
  docClient.deleteItem(delParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

export function delApp(callback, PK) {
  const delParams = {
    Key: { app_id: { S: PK } },
    TableName: 'app_table',
  };
  docClient.deleteItem(delParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

export function delModel(callback, PK) {
  const delParams = {
    Key: { model_id: { S: PK } },
    TableName: 'model_table',
  };
  docClient.deleteItem(delParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

export function delDataset(callback, PK) {
  const delParams = {
    Key: { dataset_id: { S: PK } },
    TableName: 'dataset_table',
  };
  docClient.deleteItem(delParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

// ---------------------------- PUT ---------------------------

export async function putEnterprise(callback, PK, email) {
  const putParams = { // works just fine
    Item: {
      enterprise_id: { S: PK },
      enteprise_account_email: { S: email },
      num_users: { N: null },
    },
    TableName: 'enterprise_table',
    ReturnConsumedCapacity: 'TOTAL',
  };

  const callbacktwo = (data, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      putParams.Item.num_users.N = String(parseInt(data.Item.num_users.N, 10) + 1);

      console.log(putParams.Item.num_users.N);
      docClient.putItem(putParams, (err, datatwo) => {
        if (err) {
          console.log(err, err.stack);
          callback(err);
        } else {
          callback(datatwo); // return server response
        }
      });
    }
  };

  getEnterprise(callbacktwo, PK);
}

export async function putUser(callback, PK, isDev, email, name, enterprise) {
  const banks = ['Bank of America', 'Citigroup', 'Bank of New York'];
  // still need: find models user owns through query

  const putParams = { // works just fine
    Item: {
      user_id: { S: PK },
      is_developer: { S: isDev },
      user_account_email: { S: email },
      name: { S: name },
      enterprise: { S: enterprise },
      bank_info: { bank_number: { N: Math.floor(Math.random() * 9999) }, bank: { S: banks[Math.floor(Math.random() * banks.length)] } },
    },
    TableName: 'user_table',
    ReturnConsumedCapacity: 'TOTAL',
  };

  docClient.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

export async function putApp(callback, PK, dataset, url) {
  const putParams = {
    Item: {
      app_id: { S: PK },
      dataset: { S: null },
      grid: { S: 'test' },
      logo_image_url: { S: url }, // where to keep this?
    },
    TableName: 'app_table',
    ReturnConsumedCapacity: 'TOTAL',
  };

  docClient.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
  // get the dataset whose app is this app's PK
}

export async function putModel(callback, PK, owner) {
  const date = Date.now();
  const putParams = { // works just fine
    Item: {
      model_id: { S: PK },
      active_status: { BOOL: true },
      owner_name: { S: owner },
      date_submitted: { S: date }, // not sure if this is in the db schema? should be.
    },
    TableName: 'model_table',
    ReturnConsumedCapacity: 'TOTAL',
  };

  docClient.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data); // return server response
    }
  });
}

export async function putDataset(callback, PK, app, name, category, numDevices) {
  const putParams = { // works just fine
    Item: {
      dataset_id: { S: PK },
      app: { S: app },
      name: { S: name },
      logo_image_url: { S: null },
      category: { S: category },
      num_devices: { N: numDevices },

    },
    TableName: 'dataset_table',
    ReturnConsumedCapacity: 'TOTAL',
  };

  const callbacktwo = (data, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      putParams.Item.logo_image_url.S = data.Item.logo_image_url.S;
      console.log(putParams.Item.logo_image_url.S); // should no longer be null

      docClient.putItem(putParams, (err, datatwo) => {
        if (err) {
          console.log(err, err.stack);
          callback(err);
        } else {
          callback(datatwo); // return server response
        }
      });
    }
  };
  // query the app table for the logo belonging to the app to whcih this dataset belongs.
  getApp(callbacktwo, putParams.Item.app.S);
}

// ----------------------- Query ----------------------

export function queryModels(callback, PK) {
  const queryParams = { // works just fine
    // AttributesToGet: ['model_id', 'owner'],
    IndexName: 'owner_name-active_status-index',
    ScanIndexForward: false,
    ExpressionAttributeValues: { ':partitionKeyVal': { S: PK } },
    KeyConditionExpression: 'owner_name = :partitionKeyVal', // dereference the "QUILL" part here, not really necessary
    TableName: 'model_table',
  };

  docClient.query(queryParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

export function queryDatasets(callback, category) {
  const queryParams = { // works just fine
    // AttributesToGet: ['model_id', 'owner'],
    IndexName: 'category-num_devices-index',
    ScanIndexForward: false,
    ExpressionAttributeValues: { ':partitionKeyVal': { S: category } },
    KeyConditionExpression: 'category = :partitionKeyVal', // dereference the "QUILL" part here, not really necessary
    TableName: 'dataset_table',
  };

  docClient.query(queryParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      callback(data);
    }
  });
}

// Testing todo
// update app DB table with one entry that has a "logo_image_url" field
// test putDataset
// test putUser for general functionality
// write update functionality. Specific method only for user table. Only need to update:
// - bank info, name, email, enterprise.
