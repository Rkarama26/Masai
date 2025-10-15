
const express = require('express');
const app = express()//  app is used to apply middeware in future
const { Server } = require('socket.io')
const cors = require('cors')

const http = require('http');
const { timeStamp } = require('console');
const { emit } = require('process');

const server = http.createServer(app);
// http cannot be skipped, socket upgradation protocol happens in http

app.use(cors())
// frontend cors policy
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500',
        methods: ["GET", "POST"]
    }
})
// temp storage
let userDetails = {}; //clientId -> userName
let onlineUsers = new Set();
let chatHistoryArray = [] // stores chat history


// io is main continous connections establishing server
io.on("connection", (client) => {
    console.log("Client connected")
    // we can customised events for client


    //event listening 
    client.on("registerUser", (userName) => {
        if (!userName) return;

        userDetails[client.id] = userName;
        console.log(userName, 'client registered')
        console.log("userDetails", userDetails)
        onlineUsers.add(userName)
        // sending updated online users to all 
        io.emit('onlineUsers', Array.from(onlineUsers))
        // display previous chats when uesr regsistered
        client.emit("chat_History", chatHistoryArray)

    });

    //client can emit an event sendMessage, by (frontend/postman)
    client.on("sendMessage", async (message) => {
        const userName = userDetails[client.id];
        if (!userName) return; // unregistered user not allowed
        // create a chat obj and store in chat History
        let chatObj = {
            from: userName,
            message: message,
            timeStamp: new Date().toISOString
        }
        // console.log(chatObj)
        // push this to chatArray
        chatHistoryArray.push(chatObj)
        //sending the message tp all client
        io.emit("chat_History", chatHistoryArray)
    });

    // admin message event
    client.on('adminMessage', (message) => {
        const userName = userDetails[client.id];
        if (userName !== "admin") return;

        const adminMsg = {
            from: "Admin",
            message: `[ADMIN]: ${message}`,
            timeStamp: new Date().toISOString()
        }

        chatHistoryArray.push(adminMsg);
        io.emit("chat_History", chatHistoryArray);
    });

    // diconnect event
    client.on("disconnect", () => {
        const userName = userDetails[client.id];
        if (userName) {
            onlineUsers.delete(userName);
            delete userDetails[client.id];
            console.log(`${userName} disconnected`);
            io.emit("onlineUsers", Array.from(onlineUsers));
        }
    });
    // manually disconnect 
    client.on("manualDisconnect", () => {
        client.disconnect();
    });

})



server.listen(3000, () => {
    console.log('server is running at port 3000')
})