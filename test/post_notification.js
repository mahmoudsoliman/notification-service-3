var assert = require('assert');
const fetch = require('node-fetch');


it('should create notification and return 201 status code', function() {
    fetch('http://localhost:8000/api/notification', {
        method: "POST",
        body: JSON.stringify({
            NotificationType: 'SMS',
            Recipient: '01000000000',
            NotificationBody: 'HELLOW WORLD!'
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        assert.equal(response.status, 201, 'Failed to create notification');
    })
    .catch(error =>{
        assert.throws(() => {
            console.log(error);
        }, 'Failed to create notification');
    });
});