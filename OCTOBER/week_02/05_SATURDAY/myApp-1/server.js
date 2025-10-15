

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

// login event
eventEmitter.on('userLoggedIn', (username) => {
    console.log(`> User ${username} logged in`);
    eventEmitter.emit('sendNotification', username);
    eventEmitter.emit('syncData', username);
})

// Notification event
eventEmitter.on('sendNotification', (username) => {
    console.log(`> Notification sent to ${username}`)
})


// sync event 
eventEmitter.on('syncData', (username) => {
    console.log(`> Syncing user data for ${username}`);
    // simulating delay 
    setTimeout(() => {
        eventEmitter.emit('dataSynced', username)
    }, 2000)
})

// finally data synced
eventEmitter.on('dataSynced', (username) => {
    console.log(`> Data sync complete for ${username}`);
});

setTimeout(() => {
    eventEmitter.emit('userLoggedIn', 'John');
}, 1000);

