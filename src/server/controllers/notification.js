const Notification = require('../models').Notification;
module.exports = {
    send(req, res){
        console.log('controller' + req.body);
        Notification.create({
            NotificationType: req.body.NotificationType,
            Recipient: req.body.Recipient,
            NotificationBody: req.body.NotificationBody,
            SendDate: Date.now()
        })
        .then(notification => res.status(201).send(notification))
        .catch(error => res.status(400).send(error))
    }
};