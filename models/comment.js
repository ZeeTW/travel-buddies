const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  },
  timeDate: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const comments = mongoose.model("Comments", commentsSchema)

module.exports = comments