const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const User = require("../models/User");

const maxAge = 3 * 60 * 60;

router.post("/login", (req, res) => {
  mongoConn();
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.json({ message: "You are not signed up" });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result === true) {
      console.log("User logged in 🏁");
      const token = jwt.sign(
        { username: user.username, user_id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: maxAge * 1000 }
      );
      res
        .cookie("token", token, { maxAge: maxAge, httpOnly: true })
        .json({ message: "Successful login", redirect_url: "/user/" });
      return;
    }

    console.log("Something very random happened");
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});
router.post("/signup", (req, res) => {
  mongoConn();
  const { username, password, email } = req.body;
  try {
    const checkExistingUser = await User.findOne({ username, email });
    if (checkExistingUser) {
      res.json({
        message: "You already have an account under these credentials",
      });
      return;
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.json({ message: "Successfully signed up" });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});

module.exports = router;
