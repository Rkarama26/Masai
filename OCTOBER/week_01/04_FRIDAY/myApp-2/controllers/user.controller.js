const UserModel = require("../models/User")

//add-user
const addUser = async (req, res) => {

    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({ msg: "User added ", newUser: newUser })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//getUserDetails
const getUserRentals = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId).populate('rentedBooks');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ rentedBooks: user.rentedBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addUser, getUserRentals }