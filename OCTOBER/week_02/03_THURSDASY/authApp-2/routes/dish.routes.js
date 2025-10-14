const { listDishes, getDish, createDish, updateDish, deleteDish } = require("../controller/dish.controller");
const authMiddleware = require("../middleware/auth.middlware");




const express = require('express');
const dishRouter = express.Router();


dishRouter.get("/", listDishes);
dishRouter.get("/:id", getDish);

dishRouter.post("/", authMiddleware(["admin"]), createDish);
dishRouter.put("/:id", authMiddleware(["admin"]), updateDish);
dishRouter.delete("/:id", authMiddleware(["admin"]), deleteDish);


module.exports = dishRouter


