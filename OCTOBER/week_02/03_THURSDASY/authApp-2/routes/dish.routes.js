const { listDishes, getDish, createDish, updateDish, deleteDish } = require("../controller/dish.controller");
const authMiddleware = require("../middleware/auth.middlware");




const express = require('express');
const dishRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management endpoints
 */


/**
 * @swagger
 * /dishes:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 250
 *               description:
 *                 type: string
 *                 example: Delicious cheese pizza
 *               category:
 *                 type: string
 *                 example: Italian
 *     responses:
 *       201:
 *         description: Dish created successfully
 *       500:
 *         description: Server error
 */
dishRouter.post("/", createDish);

/**
 * @swagger
 * /dishes:
 *   get:
 *     summary: Get list of all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: List of dishes
 *       500:
 *         description: Server error
 */
dishRouter.get("/", listDishes);


/**
 * @swagger
 * /dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dish ID
 *     responses:
 *       200:
 *         description: Dish details
 *       404:
 *         description: Dish not found
 */
dishRouter.get("/:id", getDish);


/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 250
 *               description:
 *                 type: string
 *                 example: Delicious cheese pizza
 *               category:
 *                 type: string
 *                 example: Italian
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       404:
 *         description: Dish not found
 */
dishRouter.post("/", authMiddleware(["admin"]), createDish);


/**
 * @swagger
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dish ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza
 *               price:
 *                 type: number
 *                 example: 250
 *               description:
 *                 type: string
 *                 example: Delicious cheese pizza
 *               category:
 *                 type: string
 *                 example: Italian
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       404:
 *         description: Dish not found
 */
dishRouter.put("/:id", authMiddleware(["admin"]), updateDish);

/**
 * @swagger
 * /dishes/{id}:
 *   delete:
 *     summary: Delete a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The dish ID
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 */
dishRouter.delete("/:id", authMiddleware(["admin"]), deleteDish);


module.exports = dishRouter


