const mongoose = require("mongoose");
const nanoid = require("nanoid");

const LogSchema = mongoose.Schema({
  title: String,
  content: String,
  uid: {
    default: nanoid.nanoid(8),
    type: String,
  },
  date: Date,
});

const LogModel = mongoose.model("Log", LogSchema);

module.exports = LogModel;
