const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
  location: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true,
    min: 0
  },

})



const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel