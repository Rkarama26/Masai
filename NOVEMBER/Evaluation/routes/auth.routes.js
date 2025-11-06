const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const validateRequest = require("../middlewares/validateRequest");

const userRouter = express.Router();

require("dotenv").config();

userRouter.post("/register", registerValidator, validateRequest, register);
userRouter.post("/login", loginValidator, validateRequest, login);

module.exports = userRouter;

/*

//  Email Communication

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // smtp protocol
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

userRouter.get("/sendemail", async (req, res) => {
  const info = await transporter.sendMail({
    from: '"Rohit karma " <karma.rohit026@gmail.com>',
    to: " rv262003@gmail.com",
    subject: "This is test mail",
    text: "this is text body", // plain‑text body
    //  html: "<b>test html body</b>", // HTML body
  });
  res.status(201).json({ message: "Email sent" });
});
//  FORGET PASSWORD

userRouter.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      // user found
      // need to send a reset pasword link to the mail
      // link should not be easily decodable
      // for that we can use token, let say -
      // user/reset-passsword?token=giufkjnsvkmdfsfjsdfgj

      const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 2 * 60 } // 2 minutes
      );
      let resetPasswordLink = `http://localhost:3000/user/reset-password?token=${resetToken}`;
      await transporter.sendMail({
        from: '"Rohit karma " ',
        to: user.email,
        subject: "Password update link",
        html: `<p>Dear ${user.username}, here is the password reset link, please finish reset Password </p>
                <h4>${resetPasswordLink}</h4> `,
      });
      res.json({
        message: "passsword reset link sent registered email",
        link: resetPasswordLink,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

//reset-password
userRouter.post("/reset-password", async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      // token verified
      // recieve new password
      let user = await UserModel.findById(decoded.userId);
      // user.password = newPassword // raw password, it should be hashed
      // await user.save();

      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        if (err)
          return res.status(500).json({ message: "Something went wrong" });

        user.password = hash; // hashed password
        await user.save();
        // after pass-reset, blacklist the token
        await BlackListTokenModel.create({ token });
        console.log(user);
        return res.status(201).json({ message: "Password reset successfully" });
      });
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      res.status(403).json({
        message:
          "Password reset link expired, plese click forget password again",
      });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again later" });
    }
  }
});
*/
