const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blogs", BlogSchema);
