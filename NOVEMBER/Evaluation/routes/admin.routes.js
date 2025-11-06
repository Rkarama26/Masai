const express = require("express");
const { generateAdminReport } = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/authMiddeware");


const adminRouter = express.Router();

// Admin-only report route
adminRouter.get("/report", authMiddleware(["admin"]), generateAdminReport);

module.exports = adminRouter;
