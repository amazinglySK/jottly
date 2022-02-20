const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/signup.html"));
});
module.exports = router;
