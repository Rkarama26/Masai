const DishModel = require("../models/dish.model");

const createDish = async (req, res) => {
    try {
        const dish = await DishModel.create(req.body);
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const listDishes = async (req, res) => {
    try {
        const dishes = await DishModel.find();
        res.status(200).json({ message: "Dishes List", dishes });
    } catch (error) {
        res.status(200).json({ message: "Somthing went wront, Try again later" })
    }
};

const getDish = async (req, res) => {
    try {
        const dish = await DishModel.findById(req.params.id);
        res.status(200).json({ message: "dish", dish });
    } catch (error) {
        return res.status(404).json({ message: "Not found" });

    }
};

const updateDish = async (req, res) => {
    try {
        const dish = await DishModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Dish Updated", dish });
    } catch (error) {
        return res.status(404).json({ message: "Not found" });

    }
};

const deleteDish = async (req, res) => {
    try {
        await DishModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        return res.status(404).json({ message: "Not found" });

    }
};


module.exports = { createDish, listDishes, getDish, updateDish, deleteDish }