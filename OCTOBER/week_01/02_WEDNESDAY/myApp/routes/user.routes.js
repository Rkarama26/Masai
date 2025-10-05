const express = require('express');
const UserModel = require('../models/user.model');
const OrderModel = require('../models/order.model');

const UserRouter = express.Router();

// add users to db
UserRouter.post("/add-user", async (req, res) => {
    // name, email, age, gender should come from req.body
    try {
        const user = await UserModel.create(req.body);
        res.status(200).json({ msg: "User created", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error, try again" });
        console.log(error)
    }
});



// add address for existing user
UserRouter.patch("/add-address/:userId", async (req, res) => {
    let { userId } = req.params

    try {
        let user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ error: "user not found" })

        user.address.push(req.body)
        //after pushing we have to save user in db 
        await user.save()
        console.log(user)
        res.status(201).json({ msg: `address added to the user ${user.name}` })
    } catch (error) {
        res.status(500).json({ error: "failed to fetch user" })
    }



})

UserRouter.get("/get/analytics", async (req, res) => {

    // using $ with and specifies that and works as operator
    //
    let user = await UserModel.find({ $and: [{ gender: "male" }, { age: { $gte: 23 } }] }, { name: 1, age: 1 })
    res.json(user)
})

UserRouter.delete("/:userId", async (req, res) => {

    let { userId } = req.params.userId;
    await OrderModel.deleteMany({ orderedBy: userId });
    await UserModel.findByIdAndDelete(userId)
    res.status(200).json({ msg: "user and associated data deleted" })
})


module.exports = UserRouter;
