

const loggerMiddleware = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

    console.log(log.trim())
    next();
}
module.exports = loggerMiddleware