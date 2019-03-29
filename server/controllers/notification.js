const Notification = require('../models').Notification;
module.exports = {
    send(req, res){
        return Notification.create({
            NotificationTypeId: req.body.NotificationTypeId,
            Recipient: req.body.Recipient,
            NotificationBody: req.body.NotificationBody,
            SendDate: req.body.SendDate,
            StatusId: req.body.StatusId,
            NotificationCategoryId: req.body.NotificationCategoryId
        })
        .then(notification => res.status(201).send(notification))
        .catch(error => res.status(400).send(error))
    }
};