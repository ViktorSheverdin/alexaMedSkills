'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'use-west-2'});

function sendSMS(phone_number, sms_body) {
    var params = {
      Message: sms_body, /* required */
      PhoneNumber: phone_number,
    };

    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
      function(data) {
        console.log("MessageID is " + data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
}

module.exports = {
    sendSMS
}