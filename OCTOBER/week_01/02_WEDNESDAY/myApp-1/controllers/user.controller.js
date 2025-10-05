const { mongo, default: mongoose } = require("mongoose");
const UserModel = require("../models/user.model")



const getUsers = async (req, res) => {
    try {
        const { profile } = req.query;
        let users;

        if (profile) {
            users = await UserModel.find({ "profiles.profileName": profile });

            if (users.length === 0) {
                // optional: return message if no user has this profile
                return res.status(404).json({
                    message: "User found, but profile not found",
                    user: null
                });
            }
        } else {
            users = await UserModel.find();
        }

        res.status(200).json({ msg: "Users retrieved", users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUser = async (req, res) => {

    try {
        const user = await UserModel.create(req.body);
        res.status(201).json({ msg: "User Created Successfully", user })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const addProfile = async (req, res) => {
    try {
        let userId = req.params.userId
        let user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ error: 'name adn profileName are required' })

        user.profiles.push(req.body);

        await user.save();
        res.status(201).json({ msg: "Profile added", user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }



};

const searchByQuery = async (req, res) => {
    const { name, profileName } = req.query;

    if (!name || !profileName) {
        return res.status(400).json({ error: 'name and profileName are required' });
    }
    try {
        const user = await UserModel.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Search for the profile inside the user's profiles array
        const profile = user.profiles.find(p => p.profileName === profileName);

        if (profile) {
            // Profile exists → return it
            return res.json({ profile });
        } else {
            // Profile not found but user exists
            return res.json({
                message: 'User found, but profile not found',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profiles: user.profiles,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


const updateProfile = async (req, res) => {
    const { userId, profileName } = req.params;
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required to update the profile' });
    }
    try {
        // Find user
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find profile index
        const profileIndex = user.profiles.findIndex(p => p.profileName === profileName);

        if (profileIndex === -1) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        // Update URL
        user.profiles[profileIndex].url = url;

        // Save changes
        await user.save();

        res.json({
            message: 'Profile updated successfully',
            profile: user.profiles[profileIndex]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE /delete-profile/:userId/:profileName
const deleteprofile = async (req, res) => {
    const { userId, profileName } = req.params;

    try {
        // Find user
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Filter out the profile to delete
        const originalLength = user.profiles.length;
        user.profiles = user.profiles.filter(p => p.profileName !== profileName);

        if (user.profiles.length === originalLength) {
            return res.status(404).json({ message: 'Profile not found for this user' });
        }

        // Save changes
        await user.save();

        res.json({ message: 'Profile deleted successfully', profiles: user.profiles });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




module.exports = {
    getUsers,
    addUser,
    addProfile,
    searchByQuery,
    updateProfile,
    deleteprofile
}