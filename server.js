const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const session = require('express-session')
//const passUsertoView = require('./middleware/pass-user-to-view')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')




//port config
const PORT = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB Database: ${mongoose.connection.name}.`)
})

//listening to the port (3000)
app.listen(PORT, () => {
  console.log(`open House App is listening${PORT}`)
})
