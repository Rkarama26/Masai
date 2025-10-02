

const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();


// Rate limiter for /api/limited
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 requests
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});  


router.get("/public", (req, res) => {
  res.json({ message: "This is a public endpoint!" });
});

// Limited route
router.get("/limited", limiter, (req, res) => {
  res.json({ message: "You have access to this limited endpoint!" });
});



module.exports = router;