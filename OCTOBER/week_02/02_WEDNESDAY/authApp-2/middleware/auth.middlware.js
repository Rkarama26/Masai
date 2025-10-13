const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!decoded) {
        return res.status(403).json({ error: "Invalid token" });
      }
      console.log(decoded)
      // role-based access check (both roles are arrays)
      if (
        roles.length > 0 &&
        (!decoded.role || !roles.some(r => decoded.role.includes(r)))
      ) {
        return res.status(403).json({ error: "Access denied: insufficient permissions" });
      }

      // attach user ID to request for downstream routes
      req.user = {
        id: decoded.userId,
        role: decoded.role
      };
      next();

    } catch (error) {
      // handle different JWT errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired. Please log in again." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token. Please log in again." });
      } else {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  };
};

module.exports = authMiddleware;
