const express = require('express');
const OrderModel = require('../models/order.model');
const UserModel = require('../models/user.model');

const OrderRouter = express.Router();

OrderRouter.post("/add-order", async (req, res) => {

    try {
        let order = await OrderModel.create(req.body)
        res.status(201).json({ msg: "Order made successully", order: order })
    } catch (error) {
        res.status(500).json(error.message)
    }
})


OrderRouter.get("/getOrders/:userId", async (req, res) => {
    let userId = req.params.userId;

    try {      // using populate also populates the user
        let user = await UserModel.findById(userId)
        let orders = await OrderModel.find({ orderedBy: userId })

        if (!user || orders.length === 0) {
            return res.status(404).json({ message: "User and orders not found" });
        }
        res.status(200).json({ msg: "fetched successully", user, orders })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

OrderRouter.get("/data", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //for pagination, skip = (page-1)*limit 
    const skip = (page - 1) * limit;
    let limitingValue = limit;


    const sortBy = req.query.sortBy || "createdAt"; // field name
    const order = req.query.order === "asc" ? 1 : -1;

    let orders = await OrderModel.find().sort({ [sortBy]: order }).skip(skip).limit(limit)
    res.json(orders)
})

module.exports = OrderRouter