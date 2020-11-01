'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (e) => {
    const now = new Date();
    const param = {
        Item: {
            id: e.deviceId,
            receivedAt: now.toISOString(),
            temperature: e.temperature,
        },
        TableName: 'cpu_temperature',
    };
    
    try {
        await docClient.put(param).promise();
    } catch(err) {
        console.error(err);
    }
};
