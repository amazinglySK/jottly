const express = require("express");
const router = express.Router();
const mongoConn = require("../lib/mongoConn");
const Log = require("../models/Log");
const { requireAuth } = require("../middlewares/authController");
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config();
// }

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPT_SECRET);

router.use(requireAuth());

router.get("/num/:num?", async (req, res) => {
  mongoConn();
  try {
    const num = Number(req.params.num);
    const { user_id } = res.locals;
    if (num) {
      var logs = await Log.find({ author: user_id })
        .sort({ date: -1 })
        .limit(num);
    } else {
      var logs = await Log.find({ author: user_id }).sort({ date: -1 });
    }
    let log_links = [];
    for (const log of logs) {
      const post_date = new Date(log.date);
      log_links.push({
        link: `/user/log/${log.uid}`,
        post_id: log.uid,
        title: log.title,
        desc: `${cryptr.decrypt(log.content).substring(0, 30)}...`,
        date: post_date.toLocaleDateString("en-GB"),
      });
    }
    res.json({ logs: log_links });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/:id", async (req, res) => {
  mongoConn();
  const uid = req.params.id;
  try {
    const log = await Log.findOne({ uid });
    if (!log) {
      res.json({ message: "no post found" });
      return;
    }
    const { title, content, date } = log;
    res.json({ title, content: cryptr.decrypt(content), date });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/new", async (req, res) => {
  mongoConn();
  try {
    const { title, content, date } = req.body;
    const author = res.locals.user_id;
    const encryptedContent = cryptr.encrypt(content);
    const newLog = new Log({ title, content: encryptedContent, author, date });
    const savedLog = await newLog.save();
    res.json({
      message: "Successfully created the log.",
      redirect_url: "/user/",
      post_id: savedLog.uid,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oops and error occured" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    await Log.deleteOne({ uid });
    res.json({
      message: "Successfully deleted the log",
      redirect_url: "/user/",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oops and error occured" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    const { title, content } = req.body;
    await Log.updateOne({ uid }, { title, content: cryptr.encrypt(content) });
    res.json({
      message: "Successfully updated the log",
      redirect_url: "/user/",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oops and error occured" });
  }
});

module.exports = router;
