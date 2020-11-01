'use strict';

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (e) => {
    const deviceId = 'mediaserver_0'; // we hardcoded deviceId here just demo purpose.
    const range = getRange(e);
    const param = {
        KeyConditionExpression: 'id = :id AND receivedAt BETWEEN :start AND :end',
        ExpressionAttributeValues: {
            ':id': deviceId,
            ':start': range.start.toISOString(),
            ':end': range.end.toISOString(),
        },
        TableName: 'cpu_temperature',
    };

    const data = await docClient.query(param).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({range, data}),
    };
};

const getRange = e => {
    const duration= (e.queryStringParameters && e.queryStringParameters.du || 60) * 1000; // milliseconds
    const now = new Date();
    // default query for last <duration> since now
    let end = now;
    let start  = new Date(now.getTime() - duration);
    if (!(e.queryStringParameters && e.queryStringParameters.start)) {
        return {start, end};
    }

    // override range if a valid start is provided
    const forceStart = new Date(e.queryStringParameters.start);
    if (forceStart) {
        start = forceStart;
        end = new Date(start.getTime() + duration)
    }
    return {start, end};
}
