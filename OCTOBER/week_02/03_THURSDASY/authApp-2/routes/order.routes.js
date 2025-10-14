

const express = require('express');
const authMiddleware = require('../middleware/auth.middlware');
const { createOrder, getOrdersForUser, getAllOrders, updateOrderStatusByChef } = require('../controller/order.controller');
const orderRouter = express.Router();



orderRouter.post("/", authMiddleware(["user", "admin"]), createOrder);
orderRouter.get("/me", authMiddleware(["user", "admin"]), getOrdersForUser);
orderRouter.get("/", authMiddleware(["user", "chef"]), getAllOrders);

orderRouter.patch("/:orderId/status", authMiddleware(["chef"]), updateOrderStatusByChef);



module.exports = orderRouter;