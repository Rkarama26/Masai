
const express = require('express');

const router = express.Router()


router.get("/get", (req, res) => {
    res.send("this is user router")
})


module.exports = router;
