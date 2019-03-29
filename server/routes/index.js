const notificationController = require('../controllers').notification;
module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to notifications service'
    }));

    app.post('/api/notification', notificationController.send);
}