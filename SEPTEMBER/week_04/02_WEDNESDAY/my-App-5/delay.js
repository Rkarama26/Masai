// delay.js
function delay(message, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, ms);
    });
}

module.exports = delay;
