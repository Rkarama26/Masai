const EventEmitter = require('events');

const event = new EventEmitter();

//.on --> listening to an event
// .emit --> Triggering/calling an event 

// //listening
// event.on("f_event", () => {
//     console.log("This is first event")
// });

// //calling
// event.emit("f_event");


// sockets are part of HTTP  Protocol

// whenever we use sockets,
// typical HTTP connections upgrads into socket
// where established connection remains alive


// Disadvantages of websockets--
// cannot create Custom Events
// Client Reconnection
// Roomcreation etc

// socket.io overcome the disadvantages of sockets