'use strict';

var AWS = require('aws-sdk');

exports.handler = async (e, ctx, callback) => {
    var documentClient = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-2'});
    var now = new Date();
    var param = {
        Item: {
            id: e.deviceId + '-'+ now.getTime(),
            receivedAt: now.toISOString(),
            temperature: e.temperature,
            deviceId: e.deviceId
        },
        TableName: 'cpu_temperature'
    };
    
    try {
        await documentClient.put(param).promise();
    } catch(err) {
    }
};
