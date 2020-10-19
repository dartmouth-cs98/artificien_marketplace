// -------------------------- Imports -----------------------------

var AWS = require('aws-sdk');

const path = require('path')
const dirPath = path.join(__dirname, 'configs.JSON')
AWS.config.loadFromPath(dirPath);

var DOC = require("dynamodb-doc");
docClient = new DOC.DynamoDB();

// -------------------------- SCAN Params -----------------------------


var scanParams = {
    TableName: "hello_world_table" // give it your table name 
};

// -------------------------- CRUD Params -----------------------------

var getParams = {
    Key: {
        "user_id": "kenneym"
    },
    TableName: "hello_world_table"
};

var putParams = {
    Item: {
        "user_id": "bigChungus",
        "Name": "Tobias Weebington",
        "Skills": {
            "Swag": 50,
            "Genius": "No"
        }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "hello_world_table"
};

var upParams = {
    Key: {
        "user_id": "bigChungus",
    },
    AttributeUpdates: {
        'Name': {
            Action: "PUT",
            Value: "JEFFERY EPSTEIN"
        }
    },
    ReturnValues: "ALL_OLD",
    ReturnValues: "ALL_NEW",
    TableName: "hello_world_table"
};

var delParams = {
    Key: {
        "user_id": "bigChungus"
    },
    ReturnValues: "ALL_OLD",
    TableName: "hello_world_table"
}

// -------------------------- DB FUNCTIONS -----------------------------

docClient.getItem(getParams, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log("--------GET-------")
        console.log(JSON.stringify(data.Item, null, 2));
        // document.getElementById("dbinfo").innerHTML = "big chungus"
    }
});

docClient.putItem(putParams, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log("--------PUT-------")
        console.log(JSON.stringify(data, null, 2));
    }
});

docClient.updateItem(upParams, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log("--------UPDATE-------")
        console.log(JSON.stringify(data, null, 2));
    }
});

docClient.deleteItem(delParams, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log("--------DEL-------")
        console.log(JSON.stringify(data, null, 2));
    }
});

docClient.scan(scanParams, function (err, data) {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log("\n--------SCAN--------");
        console.log(JSON.stringify(data, null, 2));
    }
});

