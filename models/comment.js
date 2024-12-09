const mongoose = require('mongoose')
const commentsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
})

const comments = mongoose.model('Comments', commentsSchema)

module.exports = comments
