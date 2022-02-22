const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const User = require("../models/User");
require("dotenv").config();

const maxAge = 3 * 60 * 60;

router.post("/login", async (req, res) => {
  mongoConn();
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.json({
        message: "You are not signed up or you have entered the wrong username",
      });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result == true) {
      console.log("User logged in 🏁");
      const token = jwt.sign(
        { username: user.username, user_id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
      );
      res
        .cookie("token", token, { maxAge: maxAge * 1000, httpOnly: true })
        .json({ message: "Successful login", redirect_url: "/user/" });
      return;
    } else {
      res.json({ message: "Incorrect password" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});
router.post("/signup", async (req, res) => {
  mongoConn();
  const { name, username, password, email } = req.body;
  try {
    const checkExistingUser = await User.findOne({ username, email });
    if (checkExistingUser) {
      res.json({
        message: "You already have an account under these credentials",
      });
      return;
    }
    const hashed_pwd = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashed_pwd, email });
    await newUser.save();
    res.json({ message: "Successfully signed up", redirect_url: "/login" });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});

module.exports = router;
