const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/authController");
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config();
// }

const maxAge = 3 * 60 * 60;

router.use(express.json());

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
      const token = jwt.sign(
        { username: user.username, user_id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
      );
      res
        .cookie("token", token, { maxAge: maxAge * 1000, httpOnly: true })
        .json({
          message: "Successful login",
          username: user.username,
          redirect_url: "/user/",
        });
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

router.get("/user", requireAuth(), async (req, res) => {
  mongoConn();
  try {
    const { user_id } = res.locals;
    const user = await User.findOne({ _id: user_id });
    const { username, bio } = user;
    res.json({ username, bio });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});

router.put("/user/:field", requireAuth(), async (req, res) => {
  mongoConn();
  try {
    const { user_id } = res.locals;
    const field = req.params.field;
    console.log(field);
    if (field == "username") {
      const { username } = req.body;
      await User.updateOne({ _id: user_id }, { username });
    } else if (field == "bio") {
      const { bio } = req.body;
      await User.updateOne({ _id: user_id }, { bio });
    } else {
      res.json({ message: `are you playing with us ?` });
      return;
    }
    res.json({ message: `updated ${field} successfully` });
    return;
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

router.put("/chpwd", requireAuth(), async (req, res) => {
  mongoConn();
  try {
    const { user_id } = res.locals;
    const { current_password, new_password } = req.body;
    const user = await User.findOne({ _id: user_id });
    const check = await bcrypt.compare(current_password, user.password);
    if (!check) {
      res.json({ message: "The password given was incorrect" });
      return;
    }
    const new_hash = await bcrypt.hash(new_password, 10);
    user.password = new_hash;
    await user.save();
    res.clearCookie("token").json({
      message: "Password updated successfully",
      redirect_url: "/login",
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
});

module.exports = router;
