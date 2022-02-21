const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    validate: [isEmail, "Incorrect email provided"],
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
