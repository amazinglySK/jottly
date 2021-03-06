const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  bio: { type: String, default: "" },
  email: {
    type: String,
    validate: [isEmail, "Incorrect email provided"],
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
