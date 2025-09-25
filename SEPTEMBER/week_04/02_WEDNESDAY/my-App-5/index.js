// index.js
const http = require('http');
const url = require('url');
const logger = require('./eventLogger');
const delay = require('./delay');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    res.setHeader('Content-Type', 'application/json');

    if (pathname === '/emit') {
        const message = query.message || "No message provided";

        logger.emit('log', message);

        res.end(JSON.stringify({ status: "success", logged: message }));
    }
    else if (pathname === '/delay') {
        const message = query.message || "No message provided";
        const time = parseInt(query.time) || 1000;

        try {
            const result = await delay(message, time);
            res.end(JSON.stringify({ status: "success", delayedMessage: result, time }));
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ status: "error", error: error.message }));
        }
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
