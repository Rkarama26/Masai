const { decode } = require("punycode");
var jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    //   check the token
    // if token is valid , then allow then
    // else send response as unAuthorised

    // how to send token??
    let token = req.headers?.authorization?.split(" ")[1]
    if (token) {
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            // attach decryprted data to the req
            req.user = decoded.userId;
            next()
        } else {
            res.status(403).json({ error: "login failed, Please login again" })
        }
    }
    else {
        res.status(500).json({ error: "unAuthorisedf" })
    }

}

module.exports = authMiddleware;