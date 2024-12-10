const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true,
    min: 0
  },
  nationality: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    require: true
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User