var Channel = require('./channel');
const fetch = require('node-fetch');
var NotificationTemplate = require('../server/models').NotificationTemplate;
var queue = 'notifications';
Channel(queue, function(err, channel, conn) {  
  if (err) {
    console.error(err.stack);
  }
  else {
    console.log('channel and queue created');
    consume();
  }
  function consume() {
    channel.get(queue, {}, onConsume);
    function onConsume(err, msg) {
      if (err) {
        console.warn(err.message);
      }
      else if (msg) {
        console.log('consuming %j', msg.content.toString());
        setTimeout(function() {
          channel.ack(msg);
          let jsonMsg = JSON.parse(msg.content.toString());
          ((jsonMsg) => {
            console.log(jsonMsg);
            NotificationTemplate.findOne({
              where: {
                NotificationTemplateKey: jsonMsg.TemplateKey
              }
            }).then(notificationTemplate => {
              if(notificationTemplate == null)
                console.log('Template Not Found');
              else
              {
                messageToBeSent = notificationTemplate.Template;
                Object.keys(jsonMsg.MessageDetails).forEach((key) => {
                  console.log(key, jsonMsg.MessageDetails[key]);
                  messageToBeSent = messageToBeSent.replace(`{${key}}`, jsonMsg.MessageDetails[key]);
                });
                console.log(messageToBeSent);
                fetch('http://localhost:8000/api/notification', {
                  method: "POST",
                  body: JSON.stringify({
                    NotificationType: jsonMsg.NotificationType,
                    Recipient: jsonMsg.Recipient,
                    NotificationBody: messageToBeSent
                  }),
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data) // Prints result from `response.json()` in getRequest
                })
                .catch(error => {
                  // Message Failed .. Requeue
                });
              }
            })
          })(jsonMsg);
          consume();
        }, 1e3);
      }
      else {
        console.log('no message, waiting...');
        setTimeout(consume, 1e3);
      }
    }
  }
});