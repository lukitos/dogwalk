/* Amplify Params - DO NOT EDIT
	API_DOGWALKAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_DOGWALKAPP_GRAPHQLAPIIDOUTPUT
	AUTH_DOGWALKAPP12AFAA1A_USERPOOLID
	ENV
	FUNCTION_S3TRIGGER12587D28_NAME
	REGION
	STORAGE_DOGPHOTOS_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1"
});

const rekog = new AWS.Rekognition();

exports.handler = async (event, data, callback) => {
    console.log('dogwalkapprekognition event', event);

    var isDog = false;
    var isChi = false;

    try {
        let rekogParams = {
            Image: {
                S3Object: {
                    Bucket: process.env.STORAGE_DOGPHOTOS_BUCKETNAME,
                    Name: event.key,
                },
            },
            MaxLabels: 50, 
            MinConfidence: 70
        };
        let rekogResult = await rekog.detectLabels(rekogParams).promise();
        console.log('success rekogResult >>>', rekogResult);
        const labelNames = rekogResult.Labels.map((l) => l.Name.toLowerCase());
        console.log('labelNames', labelNames);
        if (labelNames.includes('dog')) {
            isDog = true;
        }
        console.log('isDog', isDog);
        if (labelNames.includes('chihuahua')) {
            isChi = true;
        }
        const response = {
            statusCode: 200,
            valid: isDog,
            validBreed: isChi,
            result: JSON.stringify(rekogResult),
            key: process.env.STORAGE_DOGPHOTOS_BUCKETNAME
        };
        callback(null, response);
    } catch(err) {
        console.log(err);
    }
};
