const Notification = require('../models').Notification;
const SMSProvider = require('../../providers/smsprovider');
const PushNotificationProvider = require('../../providers/pushnotificationprovider');

const sendOrRetry = (provider, notification) => {
    let retryInterval = setInterval(() => {
        provider.send(notification)
        .then(() => {
            clearInterval(retryInterval);
        })
    }, 1000);
};

module.exports = {
    send(req, res){
        Notification.create({
            NotificationType: req.body.NotificationType,
            Recipient: req.body.Recipient,
            NotificationBody: req.body.NotificationBody,
            SendDate: Date.now()
        })
        .then(notification => {
            if(notification.NotificationType == 'SMS')
            {
                sendOrRetry(SMSProvider, notification);
            }
            else
            {
                sendOrRetry(PushNotificationProvider, notification);
            }
            res.status(201).send(notification)
        })
        .catch(error => res.status(400).send(error))
    }
};