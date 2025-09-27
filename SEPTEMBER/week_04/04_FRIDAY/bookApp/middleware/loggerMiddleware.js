
function loggerMiddleware(req, res, next) {
  const now = new Date();
  const time = now.toISOString().replace("T", " ").split(".")[0];
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = loggerMiddleware;