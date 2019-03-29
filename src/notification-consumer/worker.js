var Channel = require('./channel');
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
          let messageAfterProcessing = ((msg) => {
            NotificationTemplate.findOne({
              where: {
                TemplateKey: msg.templateKey
              }
            }).then(notificationTemplate => {
              if(notificationTemplate == null)
                console.log('Template Not Found');
              else
              {
                messageToBeSent = notificationTemplate.Template;
                msg.MessageDetails.forEach((key, value) => {
                  messageToBeSent.replace(key, value);
                });
                fetch('http://localhost:8000/api/notification', {
                  method: "POST",
                  body: {
                    NotificationType: msg.NotificationType,
                    Recipient: msg.Recipient,
                    NotificationBody: msg.NotificationBody
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
          })(msg);
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