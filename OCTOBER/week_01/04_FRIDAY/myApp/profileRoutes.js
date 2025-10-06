const express = require("express");
const UserModel = require("./models/User");
const ProfileModel = require("./models/Profile");
const profileRoutes = express.Router();

//  /add-profile
profileRoutes.post("/add-profile", async (req, res) => {
  try {
    const { bio, socialMediaLinks, user } = req.body;

    // Check if user 
    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    //(no duplicate profile for same user)
    const existingProfile = await Profile.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this user" });
    }

    const profile = new Profile({ bio, socialMediaLinks, user });
    await profile.save();
    res.status(201).json({ msg: "Profile added", profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  /get-profiles 
profileRoutes.get("/get-profiles", async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate("user", "name email");
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = profileRoutes;
