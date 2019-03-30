module.exports = {
    send: () => {
        return new Promise((resolve, reject) => {
            resolve("Notification sent successfully");
        })
    }
}