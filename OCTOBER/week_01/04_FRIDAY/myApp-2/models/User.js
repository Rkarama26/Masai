const { default: mongoose, mongo } = require("mongoose");


const userSchema = new mongoose.Schema({

    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    rentedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})


const UserModel = new mongoose.model('User', userSchema);
module.exports = UserModel