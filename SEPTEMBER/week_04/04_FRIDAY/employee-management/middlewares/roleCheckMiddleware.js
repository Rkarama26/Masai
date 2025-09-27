function roleCheck(allowedRoles) {
  return (req, res, next) => {
    const role = req.headers["x-role"];

    if (!role) {
      return res.status(403).json({ message: "Role header (x-role) required" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access denied for your role" });
    }

    next();
  };
}

module.exports = roleCheck;
