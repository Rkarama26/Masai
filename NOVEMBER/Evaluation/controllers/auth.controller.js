const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { sendWelcomeEmail } = require("../utils/sendEmail");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) return res.status(500).json({ message: "Something went wrong" });

      const newUser = await UserModel.create({
        username,
        email,
        password: hash,
        role,
      });

      // email after successful registration
      sendWelcomeEmail(newUser.email, newUser.username);

      res.status(201).json({ message: "User Registered Successfully" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found, please signup" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ message: "Wrong Password" });

    //  Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" } // 24 hours
    );

    res.status(200).json({
      message: "Login Successfull",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { register, login };
