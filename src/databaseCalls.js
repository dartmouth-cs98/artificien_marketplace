const AWS = require('aws-sdk/dist/aws-sdk-react-native');

// -------------------------- Imports -----------------------------

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIA2PA6YNEMESO7RV7A',
  secretAccessKey: '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',
});

export const docClient = new AWS.DynamoDB();

// --------------------------CRUD Operations------------------------

function getKey(tableName, PK) {
  if (tableName === 'enterprise_table') {
    return {
      enterprise: {
        S: PK,
      },
    };
  } else if (tableName === 'user_table') {
    return {
      user_id: {
        S: PK,
      },
    };
  } else if (tableName === 'app_table') {
    return {
      app_id: {
        S: PK,
      },
    };
  } else if (tableName === 'model_table') {
    return {
      model_id: {
        S: PK,
      },
    };
  } else if (tableName === 'dataset_table') {
    return {
      dataset_id: {
        S: PK,
      },
    };
  } else {
    return null;
  }
}

// ----------------------------------------------------------------

function structurePutJSON(tableName, PK, attributes) {
  const key = getKey(tableName, PK); // table-specific PK

  if (tableName === 'enterprise_table') {
    if (attributes.length !== 4) { // WHAT EXACTLY ARE "users"???
      console.log('Wrong attributes for enterprise');
      return null;
    }

    const putParams = {
      Item: {
        key, // currently { {key}}, should be {key **FIX
        num_models: {
          N: attributes[0],
        },
        enteprise_account_email: {
          S: attributes[1],
        },
        num_users: {
          N: attributes[2],
        },
        users: {
          S: '',
        },
      },
      TableName: tableName,
    };
    return putParams;
  } else if (tableName === 'user_table') {
    if (attributes.length !== 8) {
      console.log('Wrong attributes for user');
      return null;
    }

    const putParams = {
      Item: {
        key, // currently { {key}}, should be {key **FIX
        is_developer: {
          BOOL: attributes[0],
        },
        user_account_email: {
          S: attributes[1],
        },
        name: {
          S: attributes[2],
        },
        enterprise: {
          S: attributes[3],
        },
        models: {
          M: attributes[4],
        },
        bank_info: {
          M: {
            bank_number: {
              N: attributes[5],
            },
            bank: {
              S: attributes[6],
            },
          },
        },
      },
      TableName: tableName,
    };
    return putParams;
  } else if (tableName === 'app_table') {
    if (attributes.length !== 2) {
      console.log('Wrong attributes for app');
      return null;
    }

    const putParams = {
      Item: {
        key,
        dataset: {
          S: attributes[0],
        },
        grid: {
          M: attributes[1],
        },
      },
      TableName: tableName,
    };
    return putParams;
  } else if (tableName === 'model_table') {
    if (attributes.length !== 2) {
      console.log('Wrong attributes for model');
      return null;
    }

    const putParams = {
      Item: {
        key,
        active_status: {
          BOOL: attributes[0],
        },
        owner: {
          S: attributes[1],
        },
      },
      TableName: tableName,
    };
    return putParams;
  } else if (tableName === 'dataset_table') {
    if (attributes.length !== 5) {
      console.log('Wrong attributes for model');
      return null;
    }

    const putParams = {
      Item: {
        key,
        app: {
          S: attributes[0],
        },
        name: {
          S: attributes[1],
        },
        logo_image_url: {
          S: attributes[2],
        },
        category: {
          S: attributes[3],
        },
        num_devices: {
          S: attributes[4],
        },
      },
      TableName: tableName,
    };
    return putParams;
  } else {
    return null;
  }
}

// use async/await. Most legible.

// ----------------------------DEL---------------------------------
function formatDelParams(tableName, PK) {
  const key = getKey(tableName, PK);
  const delParams = {
    Key: { key },
    ReturnValues: 'ALL_OLD',
    TableName: tableName,
  };
  return delParams;
}

export function delResponse(tableName, PK) {
  const params = formatDelParams(tableName, PK); // make JSON

  docClient.deleteItem(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      return null;
    } else {
      return data; // return server response
    }
  });
}

// ----------------------------GET---------------------------------

function formatGetParams(tableName, PK) {
  const key = getKey(tableName, PK); // table-specific PK
  const getParams = {
    Key: key,
    TableName: tableName,
  };
  return getParams;
}

export function getResponse(tableName, PK) {
  const params = formatGetParams(tableName, PK); // format JSON
  console.log(PK);
  return new Promise((resolve, reject) => {
    docClient.getItem(params, (err, data) => { // send and receieve
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        // console.log(data);
        resolve(data);
      }
    });
  });
}

// ----------------------------PUT---------------------------------

function formatPutParams(tableName, PK, attributes) {
  const putParams = structurePutJSON(tableName, PK, attributes);
  return putParams;
}

export function putResponse(tableName, PK, attributes) {
  const params = formatPutParams(tableName, PK, attributes); // format JSON

  return new Promise((resolve, reject) => {
    docClient.putItem(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
}

// ---------------------------Wrapper-----------------------------
export async function makeDbRequest(operation, tableName, PK, attributes = null) {
  if (operation === 'GET') {
    const resp = await getResponse(tableName, PK).then((data) => {
      console.log(data);
      return data;
    }).catch((error) => {
      console.log(error, error.stack);
    });
    return resp;
  } else if (operation === 'DEL') {
    const resp = await delResponse(tableName, PK).then((data) => {
      console.log(data);
      return data;
    }).catch((error) => {
      console.log(error, error.stack);
    });
    return resp;
  } else if (operation === 'PUT') {
    const resp = await putResponse(tableName, PK, attributes).then((data) => {
      console.log(data);
      return data;
    }).catch((error) => {
      console.log(error, error.stack);
    });
    return resp;
  } else { // Update?
    return null;
  }
}

export function getAllUsers(callback) {
  docClient.scan({ TableName: 'user_table' }, (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      callback(data.Items, null);
    }
  });
}
