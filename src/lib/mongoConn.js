const mongoose = require("mongoose");

const mongoConn = () => {
  mongoose.connect(process.env.MONGODB_URI);
};

module.exports = mongoConn;
