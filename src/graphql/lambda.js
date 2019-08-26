const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});


exports.handler = (event) => {
    console.log('test');
    let params = {
        TableName: 'Establishment-7ocp7mxgbvf5xj4we3z4k7q2lq-prod',
        KeyConditionExpression: "#uid = :uid",
        ExpressionAttributeNames: {
            "#uid": "uid"
        },
        ExpressionAttributeValues: {
            ":uid": 'ChIJ0flNzTB7SFMRaMLCRAmt-5o'
        }
    };


    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log(data.Items[0].id);

            docClient.query({
                TableName: 'Beer-7ocp7mxgbvf5xj4we3z4k7q2lq-prod',
                KeyConditionExpression: "#beerEstablishmentId = :beerEstablishmentId",
                ExpressionAttributeNames: {
                    "#beerEstablishmentId": "beerEstablishmentId"
                },
                ExpressionAttributeValues: {
                    ":beerEstablishmentId": data.Items[0].id
                }
            }, function (err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Query succeeded.");
                    console.log(data.Items);
                }
            });

            return data.Items[0].uid;
        }
    });
};
