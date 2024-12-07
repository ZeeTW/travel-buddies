const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
// const session = require('express-session')
// const passUsertoView = require('./middleware/pass-user-to-view')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

// data connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`connected to MongoDB Database: ${mongoose.connection.name}`)
})

//controllers
const postsCtrl = require ('./controllers/posts')

app.use('/posts', postsCtrl)

//port config
const PORT = process.env.PORT ? process.env.PORT : '3000'

//listen for the HTTP requests
app.listen(PORT, () => {
  console.log(`Travel Buddies App is listening for requests on port ${PORT}`)
})