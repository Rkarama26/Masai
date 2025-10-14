

const mongoose = require('mongoose');


const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const DishModel = new mongoose.model("Dish", dishSchema);

module.exports = DishModel;  
 


 