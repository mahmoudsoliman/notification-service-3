module.exports = {
    send: () => {
        return new Promise((resolve, reject) => {
            resolve("SMS sent successfully");
        })
    }
}