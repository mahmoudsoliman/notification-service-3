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
        Recipient: '01008062008',
        MessageType: 'SMS',
        MessageDetails: {
            name: 'Soli',
            number_of_cities: 10
        }
    };
    var sent = channel.sendToQueue(queue, encode(notification), {
      persistent: true
    });
    console.log(sent);
    setImmediate(function() {
      channel.close();
      conn.close();
    });
  }
});

function encode(doc) {  
    return new Buffer.from(JSON.stringify(doc));
}