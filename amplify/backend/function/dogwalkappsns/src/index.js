/* Amplify Params - DO NOT EDIT
	API_DOGWALKAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_DOGWALKAPP_GRAPHQLAPIIDOUTPUT
	AUTH_DOGWALKAPP12AFAA1A_USERPOOLID
	STORAGE_DOGPHOTOS_BUCKETNAME
Amplify Params - DO NOT EDIT */

var AWS = require("aws-sdk");
var sns = new AWS.SNS();

exports.handler = async (event, context, callback) => {
  console.log('process.env.SNS_TOPIC_ARN', process.env.SNS_TOPIC_ARN);
  console.log('event', event);
  console.log('context', context);
  console.log('sns_type', event.sns_type);

  if (event.sns_type === 'Start Walking') {
    var params = {
      Message: `Dog walker ${event.walker_email} starts walking the dog`, 
      Subject: `Dog Walking for ${event.dog_name} Started`,
      TopicArn: process.env.SNS_TOPIC_ARN,
      MessageAttributes: {
        email: {
          DataType: 'String',
          StringValue: 'cottonlukito@gmail.com'
        }
      }
    };
  } else {
    var params = {
      Message: `Dog walker ${event.walker_email} finish walking the dog`, 
      Subject: `Dog Walking for ${event.dog_name} Completed`,
      TopicArn: process.env.SNS_TOPIC_ARN,
      MessageAttributes: {
        email: {
          DataType: 'String',
          StringValue: 'cottonlukito@gmail.com'
        }
      }
    };
  }

  console.log('params', params);
  
  sns.publish(params, context.done);

  const response = {
      statusCode: 200,
      body: JSON.stringify('Successfully sent SNS message'),
      dog_name: event.dog_name,
      walker_email: event.walker_email,
      sns_type: event.sns_type,
  };

  callback(null, response);
};

