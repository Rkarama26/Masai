const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token missing" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
        }

        // Attach userId to request
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;
