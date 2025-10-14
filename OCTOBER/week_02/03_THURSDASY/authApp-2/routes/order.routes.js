

const express = require('express');
const authMiddleware = require('../middleware/auth.middlware');
const { createOrder, getOrdersForUser, getAllOrders, updateOrderStatusByChef } = require('../controller/order.controller');
const orderRouter = express.Router();



/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []   # JWT auth if implemented
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     dish:
 *                       type: string
 *                       example: 64f3c9a2f1e2b2d1a1234567
 *                     qty:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: No items provided
 *       500:
 *         description: Server error
 */
orderRouter.post("/", authMiddleware(["user", "admin"]), createOrder);


/**
 * @swagger
 * /orders/user:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *       500:
 *         description: Server error
 */
orderRouter.get("/me", authMiddleware(["user", "admin"]), getOrdersForUser);


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (admin or chef view)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
orderRouter.get("/", authMiddleware(["user", "chef"]), getAllOrders);


/**
 * @swagger
 * /orders/{orderId}/status:
 *   put:
 *     summary: Update order status by assigned chef
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Preparing, Out for Delivery, Delivered]
 *                 example: Preparing
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid status
 *       403:
 *         description: Unauthorized update
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

orderRouter.patch("/:orderId/status", authMiddleware(["chef"]), updateOrderStatusByChef);

 

module.exports = orderRouter;