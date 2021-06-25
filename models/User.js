const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 12,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (error, passwordHashed) => {
    if (error) {
      return next(error);
    }
    this.password = passwordHashed;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return cb(error);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
