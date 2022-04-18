const express = require("express");
const router = express.Router();
const path = require("path");
const { requireAuth } = require("../middlewares/authController");

router.use(requireAuth());

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/home.html"));
});

router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/settings.html"));
});

router.get("/allLogs", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/allLogs.html"));
});

router.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/newLog.html"));
});

router.get("/log/:id?", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/log.html"));
});

router.get("/update/:id?", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/user/logEdit.html"));
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
