var Channel = require('./channel');
var queue = 'notifications';
Channel(queue, function(err, channel, conn) {  
  if (err) {
    console.error(err.stack);
  }
  else {
    console.log('channel and queue created');
    var notification = {
        TemplateKey: 'WELMSG',
        Recipient: '01000000000',
        NotificationType: 'SMS',
        Language: 'ar',
        MessageDetails: {
            name: 'test-name',
            number_of_cities: 10
        }
    };
    var sent = channel.sendToQueue(queue, encode(notification), {
      persistent: true
    });
    setTimeout(function() {
      channel.close();
      conn.close();
      console.log(sent);
    }, 500);
  }
});

function encode(doc) {  
    var jsonString = JSON.stringify(doc);
    console.log(jsonString);
    return new Buffer.from(jsonString);
}