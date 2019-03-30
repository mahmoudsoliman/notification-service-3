var amqp = require('amqplib/callback_api');
var url = process.env.AMQP_URL || 'amqp://guest:guest@localhost:32771';
module.exports = createQueueChannel;
function createQueueChannel(queue, cb) {  
  amqp.connect(url, onceConnected);
  function onceConnected(err, conn) {
    if (err) {
      cb(err);
    }
    else {
      console.log('connected');
      conn.createChannel(onceChannelCreated);
    }

    function onceChannelCreated(err, channel) {
      if (err) {
        console.log('error creating channel');
        cb(err);
      }
      else {
          console.log('channel created');
          channel.assertQueue(queue, {durable: true}, onceQueueCreated);
      }
      function onceQueueCreated(err) {
        if (err) {
          console.log('error creating queue');
          cb(err);
        }
        else {
          console.log('queue created');
          cb(null, channel, conn);
        }
      }
    }
  }
}